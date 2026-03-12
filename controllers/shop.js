const Product = require('../models/product')
const Cart = require('../models/cart')

class shopController {
    
    async getAllProducts (req, res) {
        const products = await Product.findAll()
        console.log(products)
        res.status(201).json({
            products: products
        })
    }

    async getCart(req,res) {
        const userCart  = await req.user.getCart()
        console.log(userCart)
        const cartProducts = await userCart.getProducts()
        res.status(201).json({
            products: cartProducts
        })
    }

    async addToCart(req,res) {
        try { 
            const productId = parseInt(req.body.productId, 10);
        if (isNaN(productId)) return res.status(400).json({ error: 'Vigane productId' });

        const product = await Product.findByPk(productId);
        if(!product) 
                return res.status(404).json({error: 'Toodet ei leitud'})
            const cart = await req.user.getCart()
            
            const items = await cart.getProducts({ where: {id: product.id}})

            if (items.length > 0) {
                const item = items[0]
                if(item.cartItem){
                await item.cartItem.increment('quantity', { by: 1})
                } else {
                    await cart.addProduct(product, { through: { quantity: 1}})
                }
            } else {
                await cart.addProduct(product,{through:{quantity:1}})
            }
            res.status(200).json({message:'toode on lisatud ostukorvi'})
        } catch ( err) {
            console.error(err)
            res.status(500).json({error:'server error 1'})
        }
    }
    async removeFromCart(req,res){
        try{
            const productId = parseInt(req.body.productId, 10);
        if (isNaN(productId)) return res.status(400).json({ error: 'Vigane productId' });

        const product = await Product.findByPk(productId);
        if (!product)
                return res.status(404).json({error: 'toodet ei leitud'})
            const cart = await req.user.getCart()
            if (!cart)
                return res.status(500).json({error:'Ostukorvi ei leitud'})
            
            const items = await cart.getProducts({ where: {id: product.id}})

            if(items.length === 0){
                return res.status(400).json({error: 'Toodet ei ole ostukorvis'})
            }

            const item = items[0]
            if(item.cartItem.quantity > 1){
                await item.cartItem.decrement('quantity', {by: 1})
            } else {
                await cart.removeProduct(product)
            }
            res.status(200).json({message: 'Toode on ostukorvist eemaldatud'})
        } catch (err){
            console.error(err)
            res.status(500).json({ error:'server error 2'})
        }
    }
}

module.exports = new shopController()