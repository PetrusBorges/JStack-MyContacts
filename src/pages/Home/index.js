//styled-components
import {
  Container,
  InputSearchContainer,
  Header,
  ErrorContainer,
  EmptyListContainer,
  ListHeader,
  SearchNotFoundContainer,
  Card } from "./styles"
import Button from '../../components/Button'

//imagens
import Arrow from '../../assets/images/icons/arrow.svg'
import Edit from '../../assets/images/icons/edit.svg'
import Trash from '../../assets/images/icons/trash.svg'
import Sad from '../../assets/images/sad.svg'
import EmptyBox from '../../assets/images/empty-box.svg'
import MagnifierQuestion from '../../assets/images/magnifier-question.svg'

//components
import Loader from '../../components/Loader'
import Modal from '../../components/Modal'

//Routes
import { Link } from "react-router-dom"

//hooks
import { useState, useEffect, useMemo, useCallback } from "react"

//utils
import toast from '../../utils/toast'

//service
import ContactsService from "../../services/ContactsService"

export default function Home() {

  const [contacts, setContacts] = useState([])
  const [orderBy, setOrderBy] = useState('asc')
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false)
  const [contactBeingDeleted, setContactBeingDeleted] = useState(null)
  const [isLoadingDelete, setIsLoadingDelete] = useState(false)

  const filteredContacts = useMemo(() => contacts.filter((contact) => (
    contact.name.toLowerCase().startsWith(searchTerm.toLowerCase())
  )), [contacts, searchTerm])

  const loadContacts = useCallback(async () => {
    try {
      setIsLoading(true)

      const contactsList = await ContactsService.listContacts(orderBy)

      setHasError(false)
      setContacts(contactsList)
    } catch {
      setHasError(true)
    } finally {
      setIsLoading(false)
    }
  }, [orderBy])

  useEffect(() => {
    loadContacts()
  }, [loadContacts])

  function handleToggleOrderBy() {
    setOrderBy((prevState) => (
      prevState === 'asc' ? 'desc' : 'asc'
    ))
  }

  function handleChangeSearchTerm(event) {
    setSearchTerm(event.target.value)
  }

  function handleTryAgain() {
    loadContacts()
  }

  function handleDeleteContact(contact) {
    setIsDeleteModalVisible(true)
    setContactBeingDeleted(contact)
  }

  function handleCloseDeleteContact() {
    setIsDeleteModalVisible(false)
    setContactBeingDeleted(null)
  }

  async function handleConfirmDeleteContact() {
    try {
      setIsLoadingDelete(true)

      await ContactsService.deleteContact(contactBeingDeleted.id)

      setContacts((prevState) => prevState.filter(
        (contact) => contact.id !== contactBeingDeleted.id
      ))

      handleCloseDeleteContact()

      toast({
        type: 'success',
        text: 'Contado deletado com sucesso!',
        duration: 3000,
      })
    } catch {
      toast({
        type: 'danger',
        text: 'Não foi possível deletar o contato!',
        duration: 3000,
      })
    } finally {
      setIsLoadingDelete(false)
    }
  }

  return (
    <Container>
      <Loader isLoading={isLoading}/>

      <Modal
          danger
          isLoading={isLoadingDelete}
          visible={isDeleteModalVisible}
          confirmLabel="Deletar"
          onCancel={handleCloseDeleteContact}
          onConfirm={handleConfirmDeleteContact}
          title={`Tem certeza que deseja remover o contato ”${contactBeingDeleted?.name}”?`}
        >
          <p>Esta ação não poderá ser desfeita!</p>
      </Modal>

      {contacts.length > 0 && (
        <InputSearchContainer>
          <input
            value={searchTerm}
            type="text"
            placeholder="Pesquise pelo nome..."
            onChange={handleChangeSearchTerm}
          />
        </InputSearchContainer>
      )}

      <Header
        hasError={hasError}
        noContacts={contacts.length > 0}
      >
        {(!hasError && contacts.length > 0) && (
          <strong>
            {filteredContacts.length}
            {filteredContacts.length === 1 ? ' Contato' : ' Contatos'}
          </strong>
        )}
        <Link to="/new">Novo contato</Link>
      </Header>

      {hasError && (
        <ErrorContainer>
          <img src={Sad} alt="Sad" />
          <div className="details">
            <strong>Ocorreu um erro ao obter os seus contatos!</strong>
            <Button type="button" onClick={handleTryAgain}>
              Tentar novamente
            </Button>
          </div>
        </ErrorContainer>
      )}

      {!hasError && (
        <>
          {(contacts.length < 1 && !isLoading) && (
            <EmptyListContainer>
              <img src={EmptyBox} alt="EmptyBox" />
              <p>
                Você ainda não tem nenhum contato cadastrado!
                Clique no botão <strong>”Novo contato”</strong> à cima para cadastrar o seu primeiro!
              </p>
            </EmptyListContainer>
          )}

          {(contacts.length > 0 && filteredContacts.length < 1) && (
            <SearchNotFoundContainer>
              <img src={MagnifierQuestion} alt="MagnifierQuestion" />
              <span>
                Nenhum resultado foi encontrado para <strong>”{searchTerm}”</strong>.
              </span>
            </SearchNotFoundContainer>
          )}

          {filteredContacts.length > 0 && (
          <ListHeader orderBy={orderBy}>
            <button type="button" onClick={handleToggleOrderBy}>
              <span>Nome</span>
              <img src={Arrow} alt="Arrow" />
            </button>
          </ListHeader>
        )}

          {filteredContacts.map((contact) => (
            <Card key={contact.id}>
              <div className="info">
                <div className="contact-name">
                  <strong>{contact.name}</strong>
                  {contact.category_name && (
                    <small>{contact.category_name}</small>
                  )}
                </div>
                <span>{contact.email}</span>
                <span>{contact.phone}</span>
              </div>

              <div className="actions">
                <Link to={`/edit/${contact.id}`}>
                  <img src={Edit} alt="Edit" />
                </Link>
                <button
                  type="button"
                  onClick={() => handleDeleteContact(contact)}
                >
                  <img src={Trash} alt="Trash" />
                </button>
              </div>
          </Card>
          ))}
        </>
      )}
    </Container>
  )
}
