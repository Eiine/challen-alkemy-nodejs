const express = require('express')
const app = express()
const sequelize= require("./database/config/db")
const mainRouter = require('./route/router');
const cookieParser = require('cookie-parser')
const port = 3000


app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser())
app.use('/', mainRouter);





app.listen(port, async() => {
  console.log(`Example app listening on port ${port}`)
  //conectandose a la base de datos
  try {
    
    
    
    await sequelize.sync({force: false});
    console.log('Connection has been established successfully.');
    
    
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})