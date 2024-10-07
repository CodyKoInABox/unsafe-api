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

    connection.query(`INSERT INTO users (username, password) VALUES ("${username}", "${password}")`, function (error, results, field){

        if (error) {

            // check if the error is duplicate username
            if (error.code === 'ER_DUP_ENTRY') {

                return res.status(400).json({ error: "Username already in use. Please choose a new username." });

            } else {

                console.error(error);
                return res.status(500).json({ error: "ERROR", details: error.sqlMessage });
                
            }
        } else {

            return res.status(200).json({ message: "Sign-Up successful", userId: results.insertId });
        }

    });

})


app.get('/login/:username/:password', (req, res) => {

    let username = req.params.username
    let password = req.params.password

    connection.query(`SELECT * FROM users WHERE username = "${username}"`, function (error, results, field){
        
        if (error) {
            
            console.error(error);
            return res.status(400).json({ error: "Error fetching user", details: error.sqlMessage });

        } 

        // check if user exists
        if (results.length === 0) {

            return res.status(400).json({ error: "Invalid username or password" });

        }

        // check if the password matches
        if (results[0].password === password) {

            return res.status(200).json({ message: "Login successful", user: results[0] });
            
        } else {

            return res.status(400).json({ error: "Invalid username or password" });
        }

    });

})

app.listen(port, () => {
    
    console.log('API is live!');

    
})