//hooks
import { useState } from 'react'

export default function useErros() {
  const [errors, setErrors] = useState([])

  function setError({ field, message}) {
    const errorAlreadyExists = errors.find((error) => error.field === field)

      if (errorAlreadyExists) {
        return
      }

    setErrors((prevState) => [
      ...prevState,
      { field, message },
    ])
  }

  function removeError(fieldName) {
    setErrors((prevState) => prevState.filter(
      (error) => error.field !== fieldName
    ))
  }

  function getErrorMessageByFielName(fieldName) {
    return errors.find((error) => error.field === fieldName)?.message
  }

  return {
    errors,
    setError,
    removeError,
    getErrorMessageByFielName }
}
