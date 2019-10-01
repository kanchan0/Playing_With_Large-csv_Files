const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const routefunction = require("./routeFunction");
 
require("./database/modal")

//using body parser as middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/getData/:from/:to',routefunction.extract_and_convert_to_csv)
app.get('/getData',routefunction.extract_and_convert_to_csv)

app.post('/insert-data',routefunction.Insert_Records)

const PORT = 4000;
app.listen(PORT,()=>{
    console.log("Server up on port :"+" "+PORT)
})