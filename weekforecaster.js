/*
  DEVELOPED BY SURAJ MISRTRY

  www.github.com/surmistry
*/
require('dotenv').config()
const express = require("express")
const request = require("request")
const app     = express()
const cors    = require("cors")
const parser  = require("xml2json")
const PORT    = process.env.PORT || 8080
const bodyParser = require("body-parser")
const API_KEY = process.env.API_KEY
/*
  This API key was given as static demonstration to plug into URL in
  browser but will not work using request packages with CORS
*/

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");


const week = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']

app.get("/", (req,res) => {
  res.render('index', {weekData: undefined});
})

app.post("/api/weather", (req,res) => {
  let tempvars = {}
  let city = req.body.city
  request
    .get(`http://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&mode=xml&units=metric&cnt=7&APPID=${API_KEY}`, function(err, response, body) {

      try{
        tempvars = JSON.parse(parser.toJson(body)).weatherdata.forecast.time
        tempvars = tempvars.map((da) => {
          let temp = da.temperature
          let avg = Math.round(( Number(temp.max) + Number(temp.min) ) / 2)
          let wobj = {
            /*
              Attempted a 7 day forcast starting at today's date,
              current implementation only starts at the week's beginning
              I would assume. On second iteration of OpenWeatherMap's API
              I would do more research into JS Date() library and then pull
              16 days and start the 7 day forcast fom there, but the 16 days
              would affect the performance and increase the delay.  Maybe
              even just (7*2) - 2 so that it only display a Mon-Mon up to a
              Fri-Fri algorithm.
            */
            day: week[new Date(da.day).getDay()],
            temperature: {
              morn: temp.morn,
              eve: temp.eve,
              avg: (avg),
              conditions: da.symbol.name
            }
          }
          return wobj
        })
      }catch(err){
        let tempvars = err
        return tempvars
      }


      res.status(response.statusCode).render('index', {weekData: tempvars, city: city} )
    })

})

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});
