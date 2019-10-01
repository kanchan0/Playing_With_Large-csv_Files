const con               =    require("../database/modal");
const fs                =    require("fs");
const mail              =    require("../Mailing_services/send_mail");
const csv               =    require('fast-csv');

function extract_and_convert_to_csv(req,res){
    let from = req.params.from ||null;
    let to = req.params.to || null; 

    let user_email=req.headers.email;
    res.send({status:true,message:"Request Received , email will with attachement will be send with next 15mins"})
    cb(from,to,user_email);
}

function cb(from,to,user_email){

    if(from!==null && to!==null){
        var sql = `select * from test_csv where Data_value > ? and Data_value < ?;`
    }else{
        var sql ="select * from test_csv;"
    }
    
    var readSt = con.query(sql,[from,to]).stream();

    var wstream = fs.createWriteStream("FINANCE.csv");
    wstream.write('Series_reference,Period,Data_value,STATUS,UNITS,MAGNITUDE\n');
    
    var ctr = 0;
    readSt.on('data', column => {
        
        readSt.pause();
        var data=column;
        var insertString = ""
        if(data){
            ctr = ctr+1;
        var Series_reference = data.Series_reference; 
        var Period= data.Period;
        var Data_value = data.Data_value;
        var STATUS = data.STATUS;
        var UNITS = data.UNITS ;
        var MAGNITUDE = data.MAGNITUDE; 

        insertString += `${Series_reference},${Period},${Data_value},${STATUS},${UNITS},${MAGNITUDE}\n`;
        
        } else {
        console.log("error occured while accessing data frm database")
        }

        wstream.write(`${insertString}`, function () {
            setTimeout(()=>{
                readSt.resume();                     //setTimeout is used to show that resume is actually working.
            },1000)
            //readSt.resume();
        })
        
        
    }) 
    readSt.on('end', ()=>{
       console.log("total number of rows",ctr)
        mail(user_email);
    });
}

let Insert_Records = (req,res)=>{

        let stream = fs.createReadStream("./testing_data/1test.csv");
        let csvData = [];
        let csvStream = csv
            .parse()
            .on("data", function (data) {
                csvData.push(data);
             })
            .on("end", function () {
                // Remove Header ROW
                csvData.shift();
    
                let query = 'INSERT INTO test_csv (Series_reference,Period,Data_value,STATUS,UNITS,MAGNITUDE) VALUES ?';
                con.query(query, [csvData], (error, response) => {
            
                    if(!error){
                        res.send({status:true,message:"Data inserted successfully"})
                    }else{
                        res.send({status:false,ERROR_Occured:error})
                        throw error;
                    }
                });
        })
    stream.pipe(csvStream);
}


module.exports = {  
    extract_and_convert_to_csv,
    Insert_Records
};