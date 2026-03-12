const Sequelize = require('sequelize')
const sequelize = require('../util/db')

const Order = sequelize.define('order', {
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    }
})

Order.associate = function(models){

    Order.belongsTo(models.user)

    Order.belongsToMany(models.product, { through: 'orderItems' })

}

module.exports = Order