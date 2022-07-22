const { Sequelize, DataTypes } = require('sequelize');
const { characters } = require('../../controller/main');
const movie= require("../models/movie")
const sequelize = require('../config/db');
const Character = require('./character');


const Movie= sequelize.define('Movie', {
  
  
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
    image: {
    type: DataTypes.STRING,
    allowNull: false
  },
    title: {
    type: DataTypes.STRING,
    allowNull: false
  },

  creationDate:{
    type: DataTypes.DATE,
    allowNull: false
  },
  
    calification: {
        type: DataTypes.INTEGER,
        allowNull: false
  }
  
  
  

}, {
  
  
    timestamps: false
  
});

module.exports=Movie;





