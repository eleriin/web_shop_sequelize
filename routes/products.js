const express = require('express')
const router = express.Router()
const productController = require('../controllers/product')

router.get('/', (req, res) => productController.getAllProducts(req, res))
router.get('/:id', (req, res) => productController.getAllProducts(req, res))

module.exports = router