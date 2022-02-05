"use strict"

const express = require('express')
var jwt = require('jsonwebtoken')

const app = express()
const port = 3000

const users =
[
    {
        username: 'kedar',
        password: 'password1'
    },
    
    {
        username: 'shubham',
        password: 'password2'
    }
    ]


app.use(express.json())

function verifyToken(request, response, next){
    console.log(request.headers)
    const header = request.headers.authorization
    if (typeof header !== 'undefined'){
        const bearer = header.split(' ')
        const bearerToken = bearer[1]
        request.token = bearerToken
        console.log(request.token)
        next()
    }
    else
    {
        response.sendStatus(403)
    }
}

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
    
    const check_user =  users.find(user => { return user.username === username &&
                                                    user.password === password});

    
    if ( check_user )
    {
    const token = jwt.sign({ username, password } , 'my_secret_key',
                           {expiresIn: '20m'})
    
        response.json({token: token})
    }
    
    else
    {
        response.send('Invalid user credentials');
    }
}

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:$\{port\}`)
})
