/*
  DEVELOPED BY SURAJ MISRTRY

  www.github.com/surmistry

  execute using "node weekforecaster.js"
*/
require('dotenv').config()
const express = require("express")
const lint    = require("lint")
const request = require("request")
const app     = express()
const parser  = require("xml2json")
const PORT    = process.env.PORT || 8080
const bodyParser = require("body-parser")
const API_KEY = process.env.API_KEY
/*
  This API key was given as static demonstration to plug into URL in
  browser but will not work using request packages with CORS
*/

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get("/", (req,res) => {
  res.render('altindex', {weekData: undefined});
})

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});
