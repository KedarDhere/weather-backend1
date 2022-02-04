"use strict"

const express = require('express')
const app = express()
const port = 3000

app.get('/v1/weather', get_weather)

function get_weather(req,response)
{
    response.json
    ({"coord":{"lon":-123.262,"lat":44.5646},"weather":[{"id":804,"main":"Clouds","description":"overcast clouds","icon":"04d"}],"base":"stations","main":{"temp":279.81,"feels_like":279.81,"temp_min":277.1,"temp_max":284.71,"pressure":1026,"humidity":75},"visibility":10000,"wind":{"speed":0,"deg":0},"clouds":{"all":100},"dt":1642279321,"sys":{"type":2,"id":2040223,"country":"US","sunrise":1642261568,"sunset":1642294710},"timezone":-28800,"id":5720727,"name":"Corvallis","cod":200})
}

app.get('/v1/hello', greeting)
function greeting(request, response){
    response.json({"greeting" : "Hi! Good Morning"})
}

app.post('/v1/auth', auth)
function auth(request, response)
{
    console.log(request.body)
    var username = request.body.username;
    var password = request.body.password;
    
    response.json({"mock_token" : "Token Validated!"})
}

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:$\{port\}`)
})
