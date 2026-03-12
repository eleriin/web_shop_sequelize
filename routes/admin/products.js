const express = require('express')
const router  = express.Router()
const productController = require('../../controllers/admin/product')

router.post('/product/add', (req, res) => productController.addProduct(req,res))

router.get('/', (req,res)=> productController.getAllProducts(req,res))
router.get('/:id', (req,res)=> productController.getProductById(req,res))

router.put('/:id', (req,res)=> productController.updateProduct(req,res))

router.delete('/:id', (req,res)=> {
    console.log('delete p2ring id',req.params.id)
    productController.deleteProduct(req,res)
})

module.exports = router