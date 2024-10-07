let express = require('express')
let app = express();
var cors = require('cors')
const port = 8080;

app.use(cors())

const mysql = require('mysql');

require('dotenv').config();

let connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
  });


app.get('/signup/:username/:password', (req, res) => {

    let username = req.params.username
    let password = req.params.password

    connection.connect();

    connection.query(`INSERT INTO users (username, password) VALUES ("${username}", "${password}")`, function (error, results, field){


        if(error){

            res.send(400)
        }
        else{

            console.log(results)
            res.send(200)
        }
    })

})


app.get('/login/:username/:password', (req, res) => {

    let username = req.params.username
    let password = req.params.password

    connection.connect();

    connection.query(`SELECT * FROM users WHERE username = "${username}"`, function (error, results, field){
        
        if(error){

            console.log(error)
            res.send(400)
        }
        else if(results[0].password == password){

            console.log(results)
            res.send(200)
        }
        else{

            res.send(400) 
        }
    });

})

app.listen(port, () => {
    
    console.log('API is live!');

    
})