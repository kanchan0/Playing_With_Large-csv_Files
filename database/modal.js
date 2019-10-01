const mySQL = require("mysql");
const keys = require("../config/keys")

var connection = mySQL.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : keys.database.password,
    database : keys.database.database
  });
   
connection.connect((err)=>{
    if(err) throw err;
    console.log("connected to the DATA-BASE")
})  
  
//connection.end();        //disconnects from mysql

module.exports = connection;