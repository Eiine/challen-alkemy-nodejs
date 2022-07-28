const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Movie = require('./movie');

const gender_movie= sequelize.define('gender_movie', {
  
    GenderId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    
  },
  MovieId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    
  },

 

}, {
  
  
    timestamps: false
  
});




module.exports=gender_movie;