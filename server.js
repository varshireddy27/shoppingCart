require("dotenv").config();
const app = require('./app');
const connect_to_database = require('./dbconfig');
connect_to_database();

app.listen(3000, () => {
  console.log("Server is running at port 3000");
});