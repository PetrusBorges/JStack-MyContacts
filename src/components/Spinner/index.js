//PropTypes
import PropTypes from 'prop-types';

//styled-components
import { SyledSpinner } from './styles'

export default function  Spinner({ size }) {
  return <SyledSpinner size={size} />
}

Spinner.propTypes = {
  size: PropTypes.number,
}

Spinner.defaultProps = {
  size: 32,
}
