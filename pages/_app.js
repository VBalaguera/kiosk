import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-toastify/dist/ReactToastify.css'
import '../styles/index.css'
import '../styles/App.css'
import '../styles/light-theme.css'
import '../styles/dark-theme.css'

import { AuthProvider } from '../src/context/AuthContext'

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  )
}

export default MyApp
