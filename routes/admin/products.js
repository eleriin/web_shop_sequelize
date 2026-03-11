const express = require('express')
const router  = express.Router()
const productController = require('../../controllers/admin/product')

router.post('/product/add', (req, res) => productController.addProduct(req,res))
router.get('/', (req,res)=> productController.getAllProducts(req,res))
router.get('/:id', (req,res)=> productController.getProductById(req,res))

module.exports = router