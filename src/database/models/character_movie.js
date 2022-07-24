const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Movie = require('./movie');

const character_movie= sequelize.define('character_movie', {
  
  characterId: {
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




module.exports=character_movie;