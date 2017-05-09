
const express = require("express")
const request = require("request")
const app     = express()
const cors    = require("cors")
const parser  = require("xml2json")
const PORT    = process.env.PORT || 8080
const seed    = requite("./data.js")
/*
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var xhr = new XMLHttpRequest();

  8c51a795eef29f8e96c683d549e31eb0
  c4ad7459922d47de298d39023cccb418
  4208c5fd0ac62f0f195743f4ea52afc8
*/

app.use(cors())
app.set("view engine", "ejs");

const API = '4208c5fd0ac62f0f195743f4ea52afc8'

app.get("/", (req,res) => {
  res.render('index', {weekData: undefined});
})
/*
    `api.openweathermap.org/data/2.5/forecast/daily?q=London&mode=xml&units=metric&cnt=7&appid=${API}`
    */
app.post("/api/weather", (req,res) => {
  let tempvars = {}
  console.log(req.body)

  /*request
    .get(`http://api.openweathermap.org/data/2.5/forecast/daily?q=London&mode=xml&units=metric&cnt=7&APPID=${API}`, function(err, response, body) {

      debugger
      tempvars = {weekData: JSON.parse(parser.toJson(body)).weatherdata.forecast.time}
      res.status(response.statusCode).render('index', tempvars )
    })*/

    tempvars = {weekData: seed}
    res.render('index', tempvars)

})

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});
