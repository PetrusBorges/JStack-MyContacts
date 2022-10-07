//esse hooks não foi utilizado ver aulas Abstraindo a lógica de erros em um Custom Hook e Habilitando botão de submit quando o form estiver válido
//o codigo abaixo está correto porém falta implementar

//hooks
import { useState } from "react";

export default function useErrors() {
  const [errors, setErrors] = useState([])

  function setError({ field, message }) {
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
      (error) => error.field !== fieldName,
    ))
  }

  function getErrorMessageByFieldName(fieldName) {
    return errors.find((error) => error.field === fieldName)?.message
  }

  return {
    errors,
    setError,
    removeError,
    getErrorMessageByFieldName
  }
}
