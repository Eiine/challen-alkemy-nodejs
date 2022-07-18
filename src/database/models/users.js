const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Users= sequelize.define('users', {
  
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  user: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  

}, {
  // Other model options go here
  
    timestamps: false
  
});

module.exports=Users;