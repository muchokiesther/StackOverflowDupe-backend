import mssql from 'mssql'
import { sqlConfig } from "../config";
import ejs from 'ejs';
import dotenv from 'dotenv'
import path from 'path'
import { sendMail } from '../Helpers/sendEmail';
dotenv.config({path:path.resolve(__dirname, '../../.env')})

interface ANSWERS{
    userId: string
    userName: string
    email: string
    roles:string
    answerId:string
    question_title:string
    emailSent:string
}

export const sendPreferredEmail = async() => {
    const pool = await mssql.connect(sqlConfig)
    const users: ANSWERS[] = (await pool.request().execute('GetJoinedData')).recordset;

    console.log(users);

    // looping through and send an email
    for (let user of users) {
        console.log(users);
        ejs.renderFile('./preferred.ejs', {username:user.userName, question_title:user.question_title}, async(err, html) => {
            
           if (err){
            console.log(err)
            return
           }
          
           
          //  send email
                try {
                
                let messageOptions = {
                    from:'muchokiesther8@gmail.com',
                    to: user.email,
                    subject: "YAY,YOUR ANSWER WAS PREFFERED!",
                    html
                }
                 await sendMail(messageOptions)   
                 //update the database email was sent
                 await pool.request().query(`UPDATE ANSWERS SET emailSent=1 WHERE userId='${user.userId}' and answerId='${user. answerId}'`);
                 
            } catch (error) {
                 console.log(error);
                    
            }
            
                   
        })
    }
};