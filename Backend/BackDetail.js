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
    database: "detail",
    port: "3306"
});

db.connect((err) => {
    if(err) console.log(err);
    else console.log('DB connected!');
})


app.post("/api/insert", (req, res)=> {
    const Name =  req.body.Name
    const Age =  req.body.Age
    const DepressionLevel =  req.body.DepressionLevel
    const DepressionStatus =  req.body.DepressionStatus

    const sqlInsert = "INSERT INTO detail (Name, Age, DepressionLevel, DepressionStatus) VALUES (?, ?, ?, ?)";
    db.query(sqlInsert, [Name, Age, DepressionLevel, DepressionStatus], (err, result)=>{
        if (err) throw err;  
    //  console.log("1 record inserted " + result); 
     res.send(result);
    }); 
});

app.get('/api/select/:Name', (req, res)=> {
    const Name = req.params.Name
    const sqlSelect = "SELECT * FROM detail WHERE Name = ?";
    db.query(sqlSelect, Name, (err, result)=>{
        if (err) throw err;  
    //  console.log("All record Shown");  
     res.send(result);
});
});

app.delete('/api/delete/:Name', (req, res) => {
    const Name = req.params.Name
    const sqlDelete = "DELETE FROM detail WHERE Name = ?";
    db.query(sqlDelete, Name, (err, result)=>{
        if (err) throw err;  
    //  console.log("record Deleted");  
     res.send(result);
});
});

app.put('/api/update', (req, res) => {
    const Name = req.body.Name
    const Age = req.body.Age
    const sqlUpdate = "UPDATE detail SET Age = ? WHERE Name = ?";
    db.query(sqlUpdate, [Age, Name], (err, result)=>{
        if (err) throw err;  
    //  console.log("record Deleted");  
     res.send(result);
});
});

app.listen(4000, ()=> {
    console.log("running on local host: 4000");
});