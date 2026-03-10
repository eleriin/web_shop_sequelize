const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

const sequelize = require('./util/db')

sequelize
    .authenticate()
    .then(() =>{
        console.log('Connection as been established successfully.');
    })
    .catch((error) =>{
        console.error('unable to connect to the database.',error)
    })

app.get('/', (req,res) => {
    res.json({msg: 'web shop app '})
});

app.listen(3002);