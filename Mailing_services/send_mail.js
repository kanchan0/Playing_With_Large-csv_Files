let Mail_sender = (email) => {
    const mail = require("../config/keys")
    const nodemailer        =       require('nodemailer')
    const smtpTransport     =       require('nodemailer-smtp-transport');

    const transporter = nodemailer.createTransport( smtpTransport ({
        
        host               :        "smtp.gmail.com",
        secureConnection   :         false,
        port               :         587,
        requiresAuth       :         true,        
        domains            :        ["gmail.com", "googlemail.com"],
        auth               :       {
                                    user : mail.nodemailer.email,            //give your email id and password make
                                                                                // sure it does not have active two way authentication
                                    pass :mail.nodemailer.password 
                                    },
        tls                :       {
                                     rejectUnauthorized:false   
                                    }
    }))

    const mailOptions = {
        to      :  email,             //the email id from above
        from    :   mail.nodemailer.email,       //receiver email id
        subject :    "hello from kanchan",
        html    :   `<p>Find the attachement you requested below</p>`,
        attachments: [
            {   // utf-8 string as an attachment
                filename: 'FINANCE.csv',        //name if the file to display in mail
                path:'./FINANCE.csv'            //actual path from which it will be send.
            }]
}

transporter.sendMail( mailOptions, (err,info) =>{
   
    if(err) {
            console.log(err)
    }   else   {
        console.log("mail sent successfully :"+" "+info.response)
    }
  })
}

module.exports=Mail_sender;