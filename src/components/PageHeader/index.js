//PropTypes
import PropTypes from 'prop-types'

//styled-components
import { Container } from "./styles"

//Routes
import { Link } from "react-router-dom"

//imagens
import Arrow from '../../assets/images/icons/arrow.svg'

export default function PageHeader({ title }) {
  return (
    <Container>
      <Link to="/">
        <img src={Arrow} alt="Arrow" />
        <span>Voltar</span>
      </Link>
      <h1>{title}</h1>
    </Container>
  )
}

PageHeader.propTypes = {
  title: PropTypes.string.isRequired,
}
