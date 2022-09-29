const { send } = require('process')
const ContactsRepository = require('../repositories/ContactsRepositories')

//utils
const isValidUUID = require('../utils/isValidUUID')

class ContactController {
  async index(request, response) {
    //listar todos os registros
    const { orderBy } = request.query
    const contacts = await ContactsRepository.findAll(orderBy)

    response.json(contacts)
  }

  async show(request, response) {
    //obter um registro
    const { id } = request.params

    if (!isValidUUID(id)) {
      return response.status(400).json({ error: 'Invalid Contact ID' })
    }

    const contact = await ContactsRepository.findById(id)

    if (!contact) {
      //404 Not Found
      return response.status(404).json({ error: 'Contact Not Found' })
    }

    response.json(contact)
  }

  async store(request, response) {
    //criar um registro
    const { name, email, phone, category_id } = request.body

    if (!name) {
      return response.status(400).json({ error: 'Name is required' })
    }

    if (category_id && !isValidUUID(category_id)) {
      return response.status(400).json({ error: 'Invalid Category' })
    }

    if (email) {
      const contactExists = await ContactsRepository.findByEmail(email)
      if (contactExists) {
        return response.status(400).json({ error: 'This email already in use' })
      }
    }

    const contact = await ContactsRepository.create({
      name,
      email: email || null,
      phone,
      category_id: category_id || null,
    })

    response.status(201).json(contact)
  }

  async update(request, response) {
    //editar um registro
    const { id } = request.params

    const { name, email, phone, category_id } = request.body

    if (!isValidUUID(id)) {
      return response.status(400).json({ error: 'Invalid Contact ID' })
    }

    if (category_id && !isValidUUID(category_id)) {
      return response.status(400).json({ error: 'Invalid Category' })
    }

    if (!name) {
      return response.status(400).json({ error: 'Name is required' })
    }

    const contactExists = await ContactsRepository.findById(id)
    if (!contactExists) {
      return response.status(404).json({ error: 'Contact Not Found' })
    }

    if (email) {
      const contactByEmail = await ContactsRepository.findByEmail(email)
      if (contactByEmail && contactByEmail.id !== id) {
        return response.status(400).json({ error: 'This email already in use' })
      }
    }

    const contact = await ContactsRepository.update(id, {
      name,
      email: email || null,
      phone,
      category_id: category_id || null,
    })

        response.json(contact)
  }

  async delete(request, response) {
    //deletar um registros
    const { id } = request.params

    if (!isValidUUID(id)) {
      return response.status(400).json({ error: 'Invalid Contact ID' })
    }

    await ContactsRepository.delete(id)
    //204 No Content
    response.sendStatus(204)
  }
}

module.exports = new ContactController()
