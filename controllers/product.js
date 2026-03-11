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
}

module.exports = new ProductController();