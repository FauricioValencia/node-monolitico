const express = require('express');
const winston = require('winston');
const mongoose = require('mongoose');
const path = require('path');
// const hbs = require('hbs');
const routeConfig = require('./routes');


const app = express();
require('./config/config.js');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
routeConfig(app);

app.use(express.static(path.resolve(__dirname, '../public')));
app.set('view engine', 'hbs');

mongoose.set('useCreateIndex', true);
mongoose.connect('mongodb://<Fauricio>:<julian123>@ds163905.mlab.com:63905/back-tesis', { useNewUrlParser: true })
.then(() => {
  winston.info('Connected to Database Successfully');
  return app.listen(process.env.PORT, () => {
    winston.info(`Example app listening on port ${process.env.PORT}!`);
  });
})
.catch((err) => {
  if (err) throw err;
});
console.log('PRUEBA PERROS: ', process.env.MONGODB);
