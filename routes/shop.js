const express = require('express')
const router = express.Router()
const shopController = require('../controllers/shop')
const shop = require('../controllers/shop')

router.get('/cart', (req,res) => shopController.getCart(req,res))

router.post('/cart/add', shopController.addToCart)
router.post('/cart/remove',shopController.removeFromCart)

router.post('/create-order', shopController.createOrder)
router.get('/orders', shopController.getOrders)

module.exports = router