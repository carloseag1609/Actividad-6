const { Sequelize } = require("sequelize");

const dbname = process.env.DBNAME;
const dbuser = process.env.DBUSER;
const dbpassword = process.env.DBPASSWORD;
const dbhost = process.env.DBHOST;

const sequelize = new Sequelize(dbname, dbuser, dbpassword, {
  host: dbhost,
  dialect: "mysql",
});

module.exports = sequelize;
