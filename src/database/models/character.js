const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

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
        type: DataTypes.INTEGER,
        allowNull: false
  },
  history: {
    type: DataTypes.STRING,
    allowNull: false
  },
  weight:{
    type: DataTypes.INTEGER,
    allowNull: false
  },
  
  "associated-movies-or-series": {
    type: DataTypes.STRING,
    allowNull: false
  },
  

}, {
  
  
    timestamps: false
  
});


module.exports=Character;