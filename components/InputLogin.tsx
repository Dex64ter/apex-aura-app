import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

type Props = {
  icon?: keyof typeof FontAwesome.glyphMap;
  password?: boolean;
  label: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
}

export default function InputLogin({ icon, password, label, placeholder, onChangeText, value }: Props) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputContainer}>
        {icon && <FontAwesome name={icon} size={18} color="white" />}
        <TextInput
          autoCapitalize="none"
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          secureTextEntry={showPassword}
          style={styles.textInput}
        />
        {
          password &&
          <Pressable onPress={() => setShowPassword(!showPassword)}>
            <FontAwesome name={showPassword ? "eye-slash" : "eye"} size={16} color="white" />
          </Pressable>
        }
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%"
  },
  label: {
    fontSize: 16,
    color: "#fff",
    marginBottom: 8,
    marginLeft: 12
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#5b5b5b',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 6,
    marginBottom: 16,
  },
  textInput: { 
    flex: 1,
    color: "#fff",
    marginLeft: 8,
    fontSize: 16
  }
})