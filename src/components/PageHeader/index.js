//routes
import { Link } from 'react-router-dom'

//PropTypes
import PropTypes from 'prop-types'

//styled-components
import { Container } from './styles'

//imagens
import arrow from '../../assets/images/icons/arrow.svg'

export default function PageHeader({ title }) {
  return (
    <Container>
      <Link to="/">
        <img src={arrow} alt="Arrow" />
        <span>Voltar</span>
      </Link>
      <h1>{title}</h1>
    </Container>
  )
}

PageHeader.propTypes = {
  title: PropTypes.string.isRequired,
}
