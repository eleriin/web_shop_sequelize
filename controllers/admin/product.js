const Product = require('../../models/product')

class adminController {

    async addProduct(req, res){
        const product = await Product.create({
            title: req.body.title,
            price: req.body.price,
            imageUrl:req.body.imageUrl,
            description:req.body.description
        })
        res.status(201).json({
            message: 'Product is added',
            productId: product.id
        })
    }

    async getAllProducts(req,res) {
        try{
            const products = await Product.findAll()
            console.log(products)
            res.status(200).json({ products })
        } catch (err) {
            console.error('viga getallproducts (admin)',err)
            res.status(500).json({error:'server error'})
        }
    }
}

module.exports = new adminController()