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

app.get('/api/select', (req, res)=> {
    const sqlSelect = "SELECT * FROM detail WHERE Name = ?";
    db.query(sqlSelect, (err, result)=>{
        if (err) throw err;  
     res.send(result);
});
});

app.get('/api/add/age', (req, res)=>{
    const sqlAdd = "SELECT CASE WHEN Age BETWEEN 1 and 10 THEN '1-10' WHEN Age BETWEEN 11 and 20 THEN '11-20' WHEN Age BETWEEN 21 and 30 THEN '21-30' WHEN Age BETWEEN 31 and 40 THEN '31-40' WHEN Age BETWEEN 41 and 50 THEN '41-50' WHEN Age BETWEEN 51 and 60 THEN '51-60' WHEN Age BETWEEN 61 and 70 THEN '61-70' WHEN Age BETWEEN 71 and 80 THEN '71-80' WHEN Age BETWEEN 81 and 90 THEN '81-90' WHEN Age BETWEEN 91 and 100 THEN '91-100' WHEN Age IS NULL THEN 'Not Filled In (NULL)' END as Data, COUNT(*) AS DepressionLevel FROM (SELECT Age FROM detail.detail) as derived GROUP BY Data ORDER BY Data";
    db.query(sqlAdd, (err, result)=>{
        if (err) throw err;  
     res.send(result);
});
});

app.get('/api/add/status', (req, res)=>{
    const sqlAdd = "SELECT DepressionStatus, COUNT(*) AS DepressionLevel FROM detail GROUP BY DepressionStatus";
    db.query(sqlAdd, (err, result)=>{
        if (err) throw err;  
     res.send(result);
});
});

app.listen(8000, ()=> {
    console.log("running on local host: 8000");
});

// SELECT name, SUM(value) as valueTotal, SUM(value) as successValueTotal FROM TableName WHERE success = 1 GROUP BY name