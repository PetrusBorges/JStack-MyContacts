//PropTypes
import PropTypes from 'prop-types'

//styled-components
import { Overlay, Container, Footer } from "./styles"

//components
import ReactPortal from '../ReactPortal'
import Button from '../Button'

export default function Modal({
  danger,
  isLoading,
  visible,
  confirmLabel,
  onCancel,
  onConfirm,
  title,
  cancelLabel,
  children,
}) {

  if (!visible) {
    return null
  }

  return (
    <ReactPortal containerId="modal-root">
      <Overlay>
        <Container
          danger={danger}
        >
          <h1>{title}</h1>
          <div className="modal-body">
            {children}
          </div>

          <Footer>
            <button
              type="button"
              className="cancel-button"
              onClick={onCancel}
              disabled={isLoading}
            >
              {cancelLabel}
            </button>
            <Button
              type="button"
              danger={danger}
              onClick={onConfirm}
              isLoading={isLoading}
            >
              {confirmLabel}
            </Button>
          </Footer>
        </Container>
      </Overlay>
    </ReactPortal>
  )
}

Modal.propTypes = {
  danger: PropTypes.bool,
  isLoading: PropTypes.bool,
  visible: PropTypes.bool.isRequired,
  confirmLabel: PropTypes.string,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  cancelLabel: PropTypes.string,
  children: PropTypes.node.isRequired,
}

Modal.defaultProps = {
  danger: false,
  isLoading: true,
  confirmLabel: "Confirmar",
  cancelLabel: "Cancelar",
}
