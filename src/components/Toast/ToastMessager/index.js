//PropTypes
import PropTypes from 'prop-types'

//styled-components
import { Container } from './styles'

//imagens
import xCircleIcon from '../../../assets/images/icons/x-circle.svg'
import checkCircleIcon from '../../../assets/images/icons/check-circle.svg'

//hooks
import { useEffect } from 'react'

export default function ToastMessager({ id, text, type, duration, onRemoveMessage }) {

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      onRemoveMessage(id)
    }, duration || 7000)

    return () => {
      clearTimeout(timeOutId)
    }
  }, [id, duration, onRemoveMessage])

  function handleRemoveToast() {
    onRemoveMessage(id)
  }

  return (
    <Container
      type={type}
      onClick={handleRemoveToast}
      tabIndex={0}
      role="button"
    >
      {type === 'danger' && <img src={xCircleIcon} alt="Danger" />}
      {type === 'success' && <img src={checkCircleIcon} alt="Success" />}
      <strong>{text}</strong>
    </Container>
  )
}

ToastMessager.propTypes = {
  id: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['default', 'success', 'danger']),
  duration: PropTypes.number,
  onRemoveMessage: PropTypes.func.isRequired,
}
