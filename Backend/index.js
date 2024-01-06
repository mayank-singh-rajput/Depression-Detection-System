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
    database: "question",
    port: "3306"
});

db.connect((err) => {
    if(err) console.log(err);
    else console.log('DB connected!');
})

app.get('/api/question/:AgeRange', (req, res)=> {
    const AgeRange = req.params.AgeRange
    const sqlSelect = "SELECT * FROM question WHERE AgeRange = ? ORDER BY RAND() LIMIT 10";
    db.query(sqlSelect, AgeRange, (err, result)=> {
        if (err) throw err;
     res.send(result);
});
});



app.listen(5000, ()=> {
    console.log("running on local host: 5000");
});














// npm run DevStart;

// app.get('/api/select', (req, res)=> {
//     const sqlSelect = "SELECT * FROM detail";
//     db.query(sqlSelect, (err, result)=>{
//         if (err) throw err;  
//     //  console.log("All record Shown");  
//      res.send(result);
// });
// });

// app.delete('/api/delete/:Name', (req, res) => {
//     const Name = req.params.Name
//     const sqlDelete = "DELETE FROM detail WHERE Name = ?";
//     db.query(sqlDelete, Name, (err, result)=>{
//         if (err) throw err;  
//     //  console.log("record Deleted");  
//      res.send(result);
// });
// });

// app.put('/api/update', (req, res) => {
//     const Name = req.body.Name
//     const Age = req.body.Age
//     const sqlUpdate = "UPDATE detail SET Age = ? WHERE Name = ?";
//     db.query(sqlUpdate, [Age, Name], (err, result)=>{
//         if (err) throw err;  
//     //  console.log("record Deleted");  
//      res.send(result);
// });
// });