const CategoriesRepository = require('../repositories/CategoriesRepositories')

class CategoryController {
  async index (request, response) {
    const categories = await CategoriesRepository.findAll()

    response.json(categories)
  }

  async store (request, response) {
    const { name } = request.body

    if (!name) {
      return response.status(400).json({ error: 'Name is required' })
    }

    const category= await CategoriesRepository.create({ name })

    response.status(201).json(category)
  }
}

module.exports = new CategoryController();
