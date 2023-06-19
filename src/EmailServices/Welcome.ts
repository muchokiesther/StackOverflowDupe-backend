import mssql from 'mssql'
import { sqlConfig } from "../config";
import ejs from 'ejs';
import dotenv from 'dotenv'
import path from 'path'
import { sendMail } from '../Helpers/sendEmail';
dotenv.config({path:path.resolve(__dirname, '../../.env')})

interface User {
    userId: string
    userName: string
    email: string
    password: string
    emailSent: number
    isDeleted: number
    roles:string
}

export const sendWelcomeEmail = async() => {
    const pool = await mssql.connect(sqlConfig)
    const users: User[] = (await (await pool.request()).query('SELECT * FROM USERS WHERE emailSent=0')).recordset
    console.log(users);

    // looping through and send an email
    for (let user of users) {
        ejs.renderFile('dist/Templates/Welcome.ejs', {name:user. userName}, async(err, html) => {
          //send email
                try {
                
                let messageOptions = {
                    from: "muchokiesther8gmail.com",
                    to: user.email,
                    subject: "Welcome Email",
                    html
                }
                 await sendMail(messageOptions)   
                 //update the database email was sent
                 await pool.request().query(`UPDATE USERS SET emailSent=1 WHERE userId='${user.userId}'`);

            } catch (error) {
                    
            }
            
                   
        })
    }
};