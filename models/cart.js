const Sequelize = require('sequelize')
const sequelize = require('../util/db')

const Cart = sequelize.define('cart', {
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    }
})

Cart.associate = function(models){

    Cart.belongsTo(models.user)

    Cart.belongsToMany(models.product, { through: 'cartItems' })

}

module.exports = Cart