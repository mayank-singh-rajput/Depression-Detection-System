const express = require('express');
const app = express();

app.use(express.json());

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

const cors = require('cors');
app.use(cors());

const mysql = require('mysql2');
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "12345",
    database: "appointment",
    port: "3306"
});

db.connect((err) => {
    if(err) console.log(err);
    else console.log('DB connected!');
})


app.post("/api/insert", (req, res)=> {
    const First_Name =  req.body.First_Name
    const Last_Name =  req.body.Last_Name
    const email =  req.body.email
    const Phone_No =  req.body.Phone_No

    const sqlInsert = "INSERT INTO appointment (First_Name, Last_Name, email, Phone_No) VALUES (?, ?, ?, ?)";
    db.query(sqlInsert, [First_Name, Last_Name, email, Phone_No], (err, result)=>{
        if (err) throw err;  
    //  console.log("1 record inserted " + result); 
     res.send(result);
    }); 
});

app.listen(9000, ()=> {
    console.log("running on local host: 9000");
});