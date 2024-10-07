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
        
            // if login is successful, create a random token that will be sent both to database and user, to do login validation


            // this will create the token on the database
            let token = createNewSession()

            return res.status(200).json({ message: "Login successful", user: results[0], session: token});
            
        } else {

            return res.status(400).json({ error: "Invalid username or password" });
        }

    });

})

function createNewSession() {
    return new Promise((resolve, reject) => {
        let token = randString(20, exampleSet);

        // Insert token into the sessions table
        connection.query(`INSERT INTO sessions (token) VALUES ("${token}")`, function (error, results, field) {
            if (error) {
                return reject(error); // Reject the promise if there's an error
            }

            resolve(token); // Resolve with the generated token
        });
    });
}


// ---------------------------- //
// CODE IMPORTED FROM TANG LINK //
// ---------------------------- //

let exampleSet = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz123456789"

function randString(length, set) {

    let output = ''

    const setLength = set.length

    for(let i = 0; i < length; i++){
        output += set.charAt(Math.floor(Math.random()*setLength))
    }

    return output
}

// ---------------------------- //
// ---------------------------- //

app.listen(port, () => {
    
    console.log('API is live!');

    
})