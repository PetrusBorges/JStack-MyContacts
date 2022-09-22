const { Router } = require('express')
const { nextTick } = require('process')

const ContactController = require('./app/controllers/ContactControlers')
const CategoryController = require('./app/controllers/CategoryController')

const router = Router()


router.get('/contacts', ContactController.index)
router.get('/contacts/:id', ContactController.show)
router.delete('/contacts/:id', ContactController.delete)
router.post('/contacts', ContactController.store)
router.put('/contacts/:id', ContactController.update)

router.get('/categories', CategoryController.index)
router.post('/categories', CategoryController.store)

module.exports = router
