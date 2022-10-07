//styled-components
import { ThemeProvider } from 'styled-components';
import Theme from '../../assets/styles/themes'
import GlobalStyled from '../../assets/styles/global'
import { Container } from './styles';

//components
import Header from '../Header';
import ToastContainer from '../Toast/ToastContainer';

//Routes
import { BrowserRouter } from 'react-router-dom'
import ReactRoutes from '../../Routes'

//hooks
import { useState, useMemo, useEffect } from 'react'

export default function App() {

  const [theme, setTheme] = useState(JSON.parse(localStorage.getItem('theme')))

  const currentTheme = useMemo(() => {
    return Theme[theme] || Theme.Dark
  }, [theme])

  function handleToggleTheme() {
    setTheme((prevState) => prevState === 'Dark' ? 'Light' : 'Dark')
  }

  useEffect(() => {
    localStorage.setItem('theme', JSON.stringify(theme))
  }, [theme])

  return (
    <BrowserRouter>
      <ThemeProvider theme={currentTheme}>
        <GlobalStyled />
        <ToastContainer />

        <Container>
          <Header
            onToggleTheme={handleToggleTheme}
            selectedTheme={theme}
          />
          <ReactRoutes />
        </Container>
      </ThemeProvider>
    </BrowserRouter>
  );
}
