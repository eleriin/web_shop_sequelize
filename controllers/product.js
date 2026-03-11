const Product = require('../models/product');

class ProductController {
    async getAllProducts(req, res) {
        try {
            const products = await Product.findAll();
            console.log(products); 
            res.status(200).json({ products });
        } catch (err) {
            console.error('Viga getAllProducts:', err);
            res.status(500).json({ error: 'Server error' });
        }
    }

    async getProductById (req, res) {
        try{
            const productId = req.params.id 
            const product = await Product.findByPk(productId)

            if(!product) {
                return res.status(404).json({error: 'Toodet ei leitud'})
            }
            res.status(200).json({product}) 
        } catch (err) {
            console.error('viga getproductbyid', err)
            res.status(500).json({error:'server error'})
        }
    }
}

module.exports = new ProductController();