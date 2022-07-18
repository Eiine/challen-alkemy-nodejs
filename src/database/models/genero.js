const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Genero= sequelize.define('genero', {
  
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false
  },
  "associated-movies-or-series": {
    type: DataTypes.STRING,
    allowNull: false
  },
  

}, {
  
  
    timestamps: false
  
});


module.exports=Genero;