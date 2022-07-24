const { Sequelize, DataTypes } = require('sequelize');
const { characters } = require('../../controller/main');
const sequelize = require('../config/db');
const movie= require('./movie');
const Character= sequelize.define('character', {
  
  
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
    name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  
    age: {
        type: DataTypes.STRING,
        allowNull: false
  },
  history: {
    type: DataTypes.STRING,
    allowNull: false
  },
  weight:{
    type: DataTypes.STRING,
    allowNull: false
  }
  
  
  

}, {
  
  
    timestamps: false
  
});


module.exports=Character;

Character.belongsToMany(movie, {through:"character_movie"})
movie.belongsToMany(Character, {through:"character_movie" })




