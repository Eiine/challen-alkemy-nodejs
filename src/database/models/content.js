const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Movie = require('./movies');

const Content= sequelize.define('Content', {
  
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


Content.associate = function () {
  Content.hasMany(Movie, {as:"movies"})
  };



module.exports=Content;