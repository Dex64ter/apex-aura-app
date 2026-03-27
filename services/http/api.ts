import { storage } from "@/app/(auth)/login";
import env from "@/environments";
import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  CancelTokenSource,
  isAxiosError,
  isCancel
} from "axios";
import { useCallback, useRef, useState } from "react";

// ─── Tipos ────────────────────────────────────────────────────────────────────

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  statusCode: number | null;
}

interface UseApiOptions extends AxiosRequestConfig {
  /** Executa a requisição automaticamente ao montar o componente (padrão: false) */
  immediate?: boolean;
  /** Dados iniciais antes da primeira requisição */
  initialData?: unknown;
}

interface UseApiReturn<T> extends UseApiState<T> {
  /** Dispara a requisição manualmente */
  execute: (overrideConfig?: AxiosRequestConfig) => Promise<T | null>;
  /** Reseta o estado para os valores iniciais */
  reset: () => void;
  /** Cancela a requisição em andamento */
  cancel: () => void;
}

// ─── Cliente Axios singleton ───────────────────────────────────────────────────

export const apiClient = axios.create({
  baseURL: env.nest.apiUrl,
  timeout: env.nest.timeout,
  headers: {
    "Content-Type": "application/json",
  },
});


// Interceptor de request — injeta token se existir
apiClient.interceptors.request.use((config) => {
  const token = storage.getString('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config;
});

// Interceptor de response — trata erros globais
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (isCancel(error)) return Promise.reject(error);

    const status = error.response?.status;

    if (status === 401) {
      // Exemplo: redirecionar para login
      // router.replace('/(auth)/login')
    }

    return Promise.reject(error);
  }
);

// ─── Hook ─────────────────────────────────────────────────────────────────────

/**
 * Hook genérico para consumo de API via Axios.
 *
 * @example
 * // GET simples
 * const { data, loading, execute } = useApi<User[]>('/users', 'GET', { immediate: true })
 *
 * @example
 * // POST com body
 * const { execute, loading } = useApi<User>('/auth/login', 'POST')
 * const handleLogin = async () => {
 *   const user = await execute({ data: { email, password } })
 * }
 *
 * @example
 * // PUT com params dinâmicos
 * const { execute } = useApi<Team>(`/teams/${id}`, 'PUT')
 * await execute({ data: { name: 'New Name' } })
 */
export function useApi<T = unknown>(
  url: string,
  method: HttpMethod = "GET",
  options: UseApiOptions = {}
): UseApiReturn<T> {
  const { immediate = false, initialData = null, ...axiosOptions } = options;

  const [state, setState] = useState<UseApiState<T>>({
    data: initialData as T | null,
    loading: immediate,
    error: null,
    statusCode: null,
  });

  const cancelSourceRef = useRef<CancelTokenSource | null>(null);

  const execute = useCallback(
    async (overrideConfig: AxiosRequestConfig = {}): Promise<T | null> => {
      // Cancela requisição anterior se ainda estiver em andamento
      if (cancelSourceRef.current) {
        cancelSourceRef.current.cancel("Nova requisição iniciada.");
      }

      // eslint-disable-next-line import/no-named-as-default-member
      cancelSourceRef.current = axios.CancelToken.source();

      setState((prev) => ({ ...prev, loading: true, error: null }));

      try {
        const response: AxiosResponse<T> = await apiClient.request<T>({
          url,
          method,
          cancelToken: cancelSourceRef.current.token,
          ...axiosOptions,
          ...overrideConfig,
        });

        setState({
          data: response.data,
          loading: false,
          error: null,
          statusCode: response.status,
        });

        return response.data;
      } catch (err: unknown) {
        if (isCancel(err)) {
          // Requisição cancelada — não atualiza estado de erro
          return null;
        }

        const errorMessage = isAxiosError(err)
          ? err.response?.data?.message ?? err.message
          : "Erro inesperado. Tente novamente.";

        const statusCode = isAxiosError(err)
          ? err.response?.status ?? null
          : null;

        setState({
          data: null,
          loading: false,
          error: errorMessage,
          statusCode,
        });

        return null;
      }
    },
    [url, method, axiosOptions]
  );

  const reset = useCallback(() => {
    setState({
      data: initialData as T | null,
      loading: false,
      error: null,
      statusCode: null,
    });
  }, [initialData]);

  const cancel = useCallback(() => {
    cancelSourceRef.current?.cancel("Requisição cancelada pelo usuário.");
  }, []);

  return { ...state, execute, reset, cancel };
}