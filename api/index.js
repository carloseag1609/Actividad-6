require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { Sequelize, DataTypes } = require("sequelize");
const routes = require("./routes");
const app = express();

const port = process.env.PORT;
const dbname = process.env.DBNAME;
const dbuser = process.env.DBUSER;
const dbpassword = process.env.DBPASSWORD;
const dbhost = process.env.DBHOST;

const sequelize = new Sequelize(dbname, dbuser, dbpassword, {
  host: dbhost,
  dialect: "mysql",
});

const User = sequelize.define("User", {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/api/", routes);

async function main() {
  try {
    await app.listen(port);
    await sequelize.authenticate();
    await sequelize.sync();
    console.log("Connection has been established successfully");
    console.log("Server on port", port);
  } catch (error) {
    console.log(error);
  }
}

main();

module.exports = User;
