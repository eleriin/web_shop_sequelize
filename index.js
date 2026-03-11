const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

const productAdminRoutes = require('./routes/admin/products')
app.use('/admin', productAdminRoutes)
app.use('/admin/products', productAdminRoutes)

const productRoutes = require('./routes/products')
app.use('/products',productRoutes)

const sequelize = require('./util/db')
   
const models = require('./models/index');

sequelize.models = models

sequelize
    .sync()
    .then(()=> {
        console.log('Tabelid on loodud')
    })
    .catch((error)=> {
        console.log(error)
    })

app.get('/', (req,res) => {
    res.json({msg: 'web shop app '})
});

app.listen(3002);