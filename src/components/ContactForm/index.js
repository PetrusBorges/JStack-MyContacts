//PropTypes
import PropTypes from 'prop-types'

//styled-components
import { Form, ButtonContainer } from './styles'
import Input from '../Input'
import Select from '../Select'
import Button from '../Button'

//components
import FormGroup from '../FormGroup'

//utils
import isEmailValid from '../../utils/isEmailValid'
import formatPhone from '../../utils/formatPhone'

//hooks
import { useState, forwardRef, useEffect, useImperativeHandle } from 'react'

//service
import CategoriesService from "../../services/CategoriesService"

const ContactForm = forwardRef(({ buttonLabel, onSubmit }, ref) => {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [errors, setErrors] = useState([])
  const [categories, setCategories] = useState([])
  const [isLoadingCategories, setIsLoadingCategories] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const isFormValid = (name && errors.length === 0)

  useImperativeHandle(ref, () => {
    return {
      setFieldsValues: (contact) => {
        setName(contact.name ?? '')
        setEmail(contact.email ?? '')
        setPhone(formatPhone(contact.phone ?? ''))
        setCategoryId(contact.category_id ?? '')
      },
      resetFields: () => {
        setName('')
        setEmail('')
        setPhone('')
        setCategoryId('')
      }
    }
  }, [])

  useEffect(() => {
    async function loadCategories() {
      try {

        const categoriesList = await CategoriesService.listCategories()

        setCategories(categoriesList)
      } catch {} finally {
        setIsLoadingCategories(false)
      }
    }

    loadCategories()
  }, [])

  async function handleSubmit(event) {
    event.preventDefault()

    setIsSubmitting(true)

    await onSubmit({
      name, email, phone, categoryId
    })

    setIsSubmitting(false)
  }

  function handleNameChange(event) {
    setName(event.target.value)

    if (!event.target.value) {
      const errorAlreadyExists = errors.find((error) => error.field === 'name')

      if (errorAlreadyExists) {
        return
      }

      setErrors((prevState) => [
        ...prevState,
        { field: 'name', message: 'Nome é obrigatório!' },
      ])
    } else {
      setErrors((prevState) => prevState.filter(
        (error) => error.field !== 'name',
      ))
    }
  }

  function handleEmailChange(event) {
    setEmail(event.target.value)

    if (event.target.value && !isEmailValid(event.target.value)) {
      const errorAlreadyExists = errors.find((error) => error.field === 'email')

      if (errorAlreadyExists) {
        return
      }

      setErrors((prevState) => [
        ...prevState,
        { field: 'email', message: 'E-mail inválido!' },
      ])
    } else {
      setErrors((prevState) => prevState.filter(
        (error) => error.field !== 'email',
      ))
    }
  }

  function handlePhoneChange(event) {
    setPhone(formatPhone(event.target.value))
  }

  function getErrorMessageByFieldName(fieldName) {
    return errors.find((error) => error.field === fieldName)?.message
  }

  return (
    <Form onSubmit={handleSubmit} noValidate>
      <FormGroup error={getErrorMessageByFieldName('name')}>
        <Input
          placeholder='Nome *'
          value={name}
          onChange={handleNameChange}
          error={getErrorMessageByFieldName('name')}
          disabled={isSubmitting}
        />
      </FormGroup>

      <FormGroup error={getErrorMessageByFieldName('email')}>
        <Input
          type="email"
          placeholder='E-mail'
          value={email}
          onChange={handleEmailChange}
          error={getErrorMessageByFieldName('email')}
          disabled={isSubmitting}
        />
      </FormGroup>

      <FormGroup>
        <Input
          maxLength="15"
          placeholder='Telefone'
          value={phone}
          onChange={handlePhoneChange}
          disabled={isSubmitting}
        />
      </FormGroup>

      <FormGroup isLoading={isLoadingCategories}>
        <Select
          value={categoryId}
          onChange={(event) => setCategoryId(event.target.value)}
          disabled={isLoadingCategories || isSubmitting}
        >
          <option value="">Sem Categoria</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </Select>
      </FormGroup>

      <ButtonContainer>
        <Button
          type="submit"
          disabled={!isFormValid}
          isLoading={isSubmitting}
        >
          {buttonLabel}
        </Button>
      </ButtonContainer>
    </Form>
  )
})

ContactForm.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
}

export default ContactForm
