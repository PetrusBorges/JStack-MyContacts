//styled-components
import { Container } from './styles'

//imagens
import logo from '../../assets/images/logo.svg'

export default function Header() {
  return (
    <Container>
      <img src={logo} alt="LogoMyContacts"  />
    </Container>
  )
}
