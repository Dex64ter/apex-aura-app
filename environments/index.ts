import development from './development'
import production from './production'

const env = __DEV__ ? development : production

export default env