//PropTypes
import PropTypes from 'prop-types'

//styled-components
import { Form, ButtonContainer } from './styles'

//hooks
import { useState, useEffect, forwardRef, useImperativeHandle } from 'react'
import useErros from '../../hooks/useErros'

//utils-functions
import isEmailValid from '../../utils/isEmailValid'
import formatPhone from '../../utils/formatPhone'

//components
import FormGroup from '../FormGroup'
import Input from '../Input'
import Select from '../Select'
import Button from '../Button'

//services
import CategoriesService from '../../services/CategoriesService'

const ContactForm = forwardRef(({ buttonLabel, onSubmit }, ref) => {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [categories, setCategories] = useState([])
  const [isLoadingCategories, setIsLoadingCategories] = useState(true)
  const [isSubmiting, setIsSubmiting] = useState(false)

  const {
    errors,
    setError,
    removeError,
    getErrorMessageByFielName
  } = useErros()

  const idFormValid = (name && errors.length === 0)

  useImperativeHandle(ref, () => ({
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
  }), [])

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

  function handleNameChange(event) {
    setName(event.target.value)

    if (!event.target.value) {
      setError({ field: 'name', message: 'Nome obrigatorio.' })
    } else {
      removeError('name')
    }
  }

  function handleEmailChange(event) {
    setEmail(event.target.value)

    if (event.target.value && !isEmailValid(event.target.value)) {
      setError({ field: 'email', message: 'E-mail inválido.' })
    } else {
      removeError('email')
    }
  }

  function handlePhoneChange(event) {
    setPhone(formatPhone(event.target.value))
  }

  async function handleSubmit(event) {
    event.preventDefault()

    setIsSubmiting(true)

    await onSubmit({
      name, email, phone, categoryId
    })

    setIsSubmiting(false)
  }

  return (
    <Form onSubmit={handleSubmit} noValidate>
      <FormGroup error={getErrorMessageByFielName('name')}>
        <Input
        error={getErrorMessageByFielName('name')}
        placeholder='Nome *'
        value={name}
        onChange={handleNameChange}
        disabled={isSubmiting}
        />
      </FormGroup>

      <FormGroup error={getErrorMessageByFielName('email')}>
        <Input
        type="email"
        error={getErrorMessageByFielName('email')}
        placeholder='E-mail'
        value={email}
        onChange={handleEmailChange}
        disabled={isSubmiting}
        />
      </FormGroup>

      <FormGroup>
        <Input
        placeholder='Telefone'
        value={phone}
        onChange={handlePhoneChange}
        maxLength="15"
        disabled={isSubmiting}
        />
      </FormGroup>

      <FormGroup isLoading={isLoadingCategories}>
        <Select
        value={categoryId}
        onChange={(event) => setCategoryId(event.target.value)}
        disabled={isLoadingCategories || isSubmiting}
        >
          <option value="">Sem categoria</option>

          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </Select>
      </FormGroup>

      <ButtonContainer>
        <Button
          type='submit'
          isabled={!idFormValid}
          isLoading={isSubmiting}
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
