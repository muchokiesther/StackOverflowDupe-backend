import mssql from 'mssql'
import { Request, RequestHandler, Response } from "express"
import {v4 as uid} from 'uuid'
import bcrypt from 'bcrypt'
import {regSchema} from "../Helpers/usersValidation";
import jwt from 'jsonwebtoken'
import { User, UserExtendedRequest } from "../interfaces";
import {DatabaseHelper} from  '../DatabaseHelpers';
import { sqlConfig } from "../config";

export const addUser = async (req: Request, res: Response) => {
    try {
      let userId = uid(); // a unique id
      const { userName, email, password } = req.body;
  
      // validation details
      const { error } = regSchema.validate(req.body);
      if (error) {
        return res.status(400).json(error.details[0].message); 
      }
  
      let hashedPassword = await bcrypt.hash(password, 10);
      await DatabaseHelper.exec('addUser', { userId, userName, email, password: hashedPassword });
      return res.status(201).json({ message: "User was successfully Registered!!" });
  
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  };
  
//get all users 

export const getAllUsers=async(req:Request,res:Response)=>{
    try{       
           let users:User[] = ( await DatabaseHelper.exec('getUsers')).recordset
           return res.status(200).json(users)
           }catch(error:any){
           return res.status(500).json(error.message)
       }
   }

//get user by email

export const getUsersByEmail:RequestHandler<{email:string}>=async(req,res)=>{
    try{
            const{email}=req.params
          
            let user:User []=  (await DatabaseHelper.exec('getUserByEmail', { email })).recordset
            if(user.length){         
                return res.status(200).json(user)
            }         
            return res.status(404).json({message:"User not found"})   
        }
        catch(error:any){
           return res.status(500).json(error.message)
       }
}


//get user by id

export const getUsersById: RequestHandler<{ userId: string }> = async (req, res) => {
    try {
      const { userId } = req.params;
      let user: User = await (await DatabaseHelper.exec('getUserByid', { userId: userId })).recordset[0];
  
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: "Invalid user ID" });
      }
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };


  //update user
  export const updateUser = async(req:Request<{userId:string}>,res:Response) =>{
    try{
            const {userId} = req.params
             let user:User[] = await (await DatabaseHelper.exec('getUserById', { userId })).recordset
            if(!user.length){
                return res.status(404).json({message:"User not found"})

            }
            const {userName, email, password} = req.body
            await DatabaseHelper.exec('updateUser' ,{userId,userName,email,password})
            
            return res.status(200).json({message:"User updated successfully"})
    }catch(error:any){
        return res.status(500).json(error.message)
    }
   }


//delete user 
export const deleteUser = async (req: UserExtendedRequest, res: Response) => {
    try {
      if (req.info && req.info.roles === 'admin') {
        const { userId } = req.params;
        let user: User[] = await (await DatabaseHelper.exec('getUserById', { userId })).recordset;
  
        if (!user.length) {
          return res.status(404).json({ message: "User does not exist" });
        }
  
        await DatabaseHelper.exec('deleteUser', { userId });
        return res.status(200).json({ message: "User deletion was successful" });
      } else {
        return res.status(403).json({ message: "Unauthorized access" });
      }
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  };
  


//logining and tokening too

export const loginUser= async (req:Request, res:Response)=>{
    try {
        const{email,password}= req.body

        let user:User[]= await (await DatabaseHelper.query(`SELECT * FROM Users WHERE email='${email}'AND isDeleted = 0`)).recordset

        if(!user[0]){
            return res.status(404).json({message:"User not Found"})
          }
    
          let validPassword = await bcrypt.compare(password,user[0].password)
         
          if(!validPassword){
            return res.status(404).json({message:"User not Found"})
          }
        
         const payload= user.map(usr=>{
            const {password, isDeleted,emailSent,...rest}=usr
            return rest
         })
         const token = jwt.sign(payload[0], process.env.SECRET_KEY as string, {expiresIn:'172800s'})
          res.status(200).json({token,role:payload[0].roles ,username:payload[0].userName})

    } catch (error:any) {
          //server side error
          return res.status(500).json({message:error.message})
    }
}