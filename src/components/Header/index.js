//PropTypes
import PropTypes from 'prop-types'

//styled-components
import { Container } from "./styles"

//Imagens
import Logo from '../../assets/images/logo.svg'
import LogoWhite from '../../assets/images/logo-white.svg'

export default function Header({ onToggleTheme, selectedTheme }) {
  return (
    <Container>
      {selectedTheme === 'Dark' && (
        <img src={LogoWhite} alt="Logo MyContacts" />
      )}
      {selectedTheme === 'Light' && (
        <img src={Logo} alt="Logo MyContacts" />
      )}
      <button onClick={onToggleTheme}>
        {selectedTheme === 'Dark' ? '🌞' : '🌚'}
      </button>
    </Container>
  )
}

Header.propTypes = {
  onToggleTheme: PropTypes.func.isRequired,
  selectedTheme: PropTypes.string.isRequired,
}
