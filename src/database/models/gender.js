const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Movie = require('./movie');

const Gender= sequelize.define('Gender', {
  
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
 

}, {
  
  
    timestamps: false
  
});

module.exports=Gender;



