const Sequelize = require('sequelize')
const sequelize = require('../util/db')

const OrderItem = sequelize.define('orderItem',{})

module.exports = OrderItem