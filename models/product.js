const Sequelize = require('sequelize')
const sequelize = require('../util/db')

const Product = sequelize.define('product', {
    id: {
        type:Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey:true
    },
    title: Sequelize.STRING,
    price:{
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    imageUrl: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false
    }
})
Product.associate = function(models){
    Product.belongsToMany(models.cart, { through: 'cartItems'})
    Product.belongsToMany(models.order, { through: 'orderItems'})
}

module.exports = Product