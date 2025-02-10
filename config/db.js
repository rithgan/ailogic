const { Sequelize } = require('sequelize');


const sequelize = new Sequelize('sqlite::memory:') // Example for sqlite
//
//
// module.exports = sequelize;

// var Sequelize = require('sequelize');

let db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
