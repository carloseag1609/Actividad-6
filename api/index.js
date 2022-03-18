require("dotenv").config();
const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const sequelize = require("./db");
const app = express();

const port = process.env.PORT;

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
