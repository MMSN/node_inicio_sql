//core node
const path = require('path');

//3rd package
const express = require('express');
const bodyParser = require('body-parser');

//controllers
const errorController = require('./controllers/error')

//util
const db = require('./util/database');

const app = express();

//engine for view
app.set('view engine', 'ejs');
app.set('views', 'views');

//routes
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname,'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

app.listen(3000);
