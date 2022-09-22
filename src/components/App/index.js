//styled-components
import { ThemeProvider } from 'styled-components'
import DefaultStyles from '../../assets/styles/themes/default'
import GlobalStyles from '../../assets/styles/global'
import { Container } from './styles'

//components
import Header from '../Header'
import ToastContainer from '../Toast/ToastContainer'

//Routes
import { BrowserRouter } from 'react-router-dom'
import ComponentRoutes from '../../Routes'

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={DefaultStyles}>
        <GlobalStyles />
        <ToastContainer />
        <Container>
          <Header />
          <ComponentRoutes />
        </Container>
      </ThemeProvider>
    </BrowserRouter>
  )
}
