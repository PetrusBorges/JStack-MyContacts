//styled-components
import { Container } from './styles';
import Theme from '../../assets/styles/themes'
import { ThemeProvider } from 'styled-components';
import GlobalStyled from '../../assets/styles/global'

//components
import Header from '../Header';
import ToastContainer from '../Toast/ToastContainer';

//Routes
import ReactRoutes from '../../Routes'
import { BrowserRouter } from 'react-router-dom'

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
