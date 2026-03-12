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

    async getProductById (req, res) {
        try{ 
            const productId = req.params.id
            const product = await Product.findByPk(productId)

            if(!product) {
                return res.status(404).json({ error: 'toodet ei leitud'})
            }
            res.status(200).json({ product })
        }  catch (err) {
            console.error('viga getprodcutbyid admin',err)
            res.status(500).json({ error: 'server error'})
        }
    }

    async updateProduct(req, res){
        try{
            const productId = req.params.id
            if (req.query.edit !== 'true'){
                return res.status(403).json({error: 'muutmine pole lubatud'})
            }

            const { title, price, imageUrl, description } = req.body
            
            const product = await Product.findByPk(productId)
            if (!product) {
                return res.status(404).json({ error: 'toodet ei leitud'})
            }

            await product.update({ title, price, imageUrl, description })
            
            res.status(200).json({ message:'toode on uuendatud', product })
        } catch (err) {
            console.error('viga updateproduct admin', err)
            res.status(500).json({ error: 'server error'})
        }
    }
    async deleteProduct(req, res){
        try{
            const productId = req.params.id
           
            const product = await Product.findByPk(productId)
            if (!product) {
                return res.status(404).json({ error: 'toodet ei leitud'})
            }

            await product.destroy()
            
            return res.status(200).json({ message:'toode on kustutatud', product })
        } catch (err) {
            console.error('viga deleteproduct admin', err)
            res.status(500).json({ error: 'server error'})
        }
    }
}

module.exports = new adminController()