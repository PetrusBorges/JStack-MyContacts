//styled-components
import { Container } from "./styles"

//components
import ToastMessager from "../ToastMessager"

//hook
import { useState, useEffect, useCallback } from "react"

//utils
import { toastEventManager } from '../../../utils/toast'

export default function ToastContainer() {

  const [messages, setMessages] = useState([])

  useEffect(() => {
    function handleAddToast({ type, text, duration }) {
      setMessages((prevState) => [
        ...prevState,
        { id: Math.random(), type, text, duration },
      ])
    }

    toastEventManager.on('addtoast', handleAddToast)

    return () => {
      toastEventManager.removeListener('addtoast', handleAddToast)
    }
  }, [])

  const handleRemoveMessage = useCallback((id) => {
    setMessages((prevState) => prevState.filter(
      (message) => message.id !== id,
    ))
  }, [])

  return (
    <Container>
      {messages.map((message) => (
        <ToastMessager
          key={message.id}
          id={message.id}
          type={message.type}
          text={message.text}
          duration={message.duration}
          onRemoveMessage={handleRemoveMessage}
        />
      ))}
    </Container>
  )
}
