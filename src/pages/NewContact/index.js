//components
import PageHeader from "../../components/PageHeader";
import ContactForm from "../../components/ContactForm";

//services
import ContactsService from "../../services/ContactsService";

//hooks
import { useRef } from 'react'

//utils
import toast from '../../utils/toast'

export default function NewContact() {
  const contacFormRef = useRef(null)

  async function handleSubmit(formData) {
    try {
      const contact = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        category_id: formData.categoryId,
      }

      await ContactsService.createContact(contact)

      contacFormRef.current.resetFields()

      toast({
        type: 'success',
        text: 'Contato cadastrado com sucesso!',
      })
    } catch {
      toast({
        type: 'danger',
        text: 'Ocorreu um erro ao carregar o contato!',
      })
    }
  }

  return (
    <>
      <PageHeader
      title="Novo contato" />

      <ContactForm
      ref={contacFormRef}
      buttonLabel="Cadastrar"
      onSubmit={handleSubmit} />
    </>
  )
}
