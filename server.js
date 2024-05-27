const express = require("express");
const app = express();
const db = require("./db");
require('dotenv').config();

const bodyParser = require("body-parser");
app.use(bodyParser.json()); //req.body
const PORT = process.env.PORT || 3000;




app.get("/", (req, res) => {
  res.send(
    "Welcome to my hotel... How can i help you ?, we have list of menus"
  );
});



//Import the router files for person
const personRoutes = require("./routes/personRoutes");
app.use("/person", personRoutes);

//Import the router files for Menu
const menuRoutes = require('./routes/menuRoutes');
app.use('/menu',menuRoutes)


app.listen(PORT, () => {
  console.log("Port 3000 running in the browser");
});


