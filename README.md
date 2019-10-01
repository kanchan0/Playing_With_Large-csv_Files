##### 
## :heart: Star :heart: the repo to support the project or :smile:[Follow Me](https://github.com/kanchan0).Thanks!


# Playing_With_Large-csv_Files
This is a express app(ONLY BACKEND), can be used to upload very large .csv files without overflowing the local buffer (by using stream and piping) and also when user request it we will send it to their mail.

I am doing this project even to show you how to keep our server from overloading.
Suppose you have requested for bank statement from a bank,which they will mail you as soon as their server extract the data but for that they won't allow you to query continuously. Whenever the databse is ideal they will process some of the data and then keep on saving and when it will be complete ,they will mail you.

### Above problem state is similar to what I have done.

#### Setting up the project
#### 1. Clone or download it and open it with any code editor.
#### 2. Run "npm install" to install all the dependencies.
#### 3. if you look at the code you might find that config folder is missing ,it is because it contained all the id's and password
        you can either directly give the id,password,database_name,root_password but if you want to do what
        I have done. Follow the below steps:-
         a> In the root directory(meaning the project directory) make a folder named "config"
         b> Inside that folder make a file with the name "keys.js" and in that file add the below code :--
        
                      module.exports={
                             nodemailer:{
                             email:"Your_email-id",        // the email-id from which you will send all the 
                                                                  mail to the user
                             password:"Password"           // password of email-id
                             },
                            database:{
                                password:"password_Of_MySQL",
                                database:'DATABASE_NAME'
                          }
                    }
                    
        c> That's all you are all set except for the fact,to create a database ,a table with all the field 
                 that are in testing_data folder.Please refer to it.
                
  #### 4. now run the project by "nodemon server.js" OR "node server.js"
  
  ### I am expecting that you know how to hit an API and will be able to look through the parameter and header passed.
  
