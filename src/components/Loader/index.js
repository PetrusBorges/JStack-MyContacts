//PropTypes
import PropTypes from 'prop-types'

//styled-components
import { Overlay } from "./styles"

//components
import ReactPortal from '../ReactPortal'
import Spinner from '../Spinner'

export default function Loader({ isLoading }) {
  if (!isLoading) {
    return null
  }

  return (
    <ReactPortal containerId="loader-root">
      <Overlay>
        <Spinner size={90} />
      </Overlay>
    </ReactPortal>
  )
}

Loader.propTypes = {
  isLoading: PropTypes.bool.isRequired,
}
