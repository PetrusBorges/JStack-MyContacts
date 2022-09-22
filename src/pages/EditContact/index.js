//components
import PageHeader from "../../components/PageHeader";
import ContactForm from "../../components/ContactForm";

//react-router
import { useParams, useNavigate } from "react-router-dom";

//components
import Loader from '../../components/Loader'

//hooks
import { useEffect, useRef, useState } from "react";
import useSafeAsyncAction from "../../hooks/useSafeAsyncAction";

//services
import ContactsService from '../../services/ContactsService'

//utils
import toast from '../../utils/toast'

export default function EditContact() {
  const [isLoading, setIsLoading] = useState(true)
  const [contactName, setContactName] = useState('')

  const contactFormRef = useRef(null)

  const { id } = useParams()
  const navigate = useNavigate()
  const safeAsyncAction = useSafeAsyncAction()

  useEffect(() => {
    async function loadContacts() {
      try {
        const contact = await ContactsService.getContactById(id)

        safeAsyncAction(() => {
          contactFormRef.current.setFieldsValues(contact)
          setIsLoading(false)
          setContactName(contact.name)
        })
      } catch {
        safeAsyncAction(() => {
          navigate('/')
          toast({
            type: 'danger',
            text: 'Contato não encontrado!',
          })
        })
      }
    }

    loadContacts()
  }, [id, navigate, safeAsyncAction])

  async function handleSubmit(formData) {
    try {
      const contact = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        category_id: formData.categoryId,
      }

      const contactData = await ContactsService.updateContact(id, contact)

      setContactName(contactData.name)

      toast({
        type: 'success',
        text: 'Contato editado com sucesso!',
      })
    } catch {
      toast({
        type: 'danger',
        text: 'Ocorreu um erro ao editar o contato!',
      })
    }
  }

  return (
    <>
      < Loader isLoading={isLoading} />

      <PageHeader
        title={isLoading ? 'Carregando...' : `Editar ${contactName}`}
      />

      <ContactForm
        ref={contactFormRef}
        buttonLabel="Salvar Alterações"
        onSubmit={handleSubmit}
      />
    </>
  )
}
