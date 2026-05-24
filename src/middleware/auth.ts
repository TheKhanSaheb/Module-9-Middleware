import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload } from 'jsonwebtoken'
import config from "../config";
import { pool } from "../db";
import { type ROLES } from "../types";



const auth = (...roles:ROLES[]) => {
    return async(req: Request, res: Response, next: NextFunction) => {

        const token =req.headers.authorization

        if(!token){
            return res.status(401).json({ message: 'Unauthorized' })
        }


//verify if it the exact token of the user or not
        const decoded = jwt.verify(token as string, config.secret as string) as JwtPayload
//get the user from the database using the email from the token
        const userData = await pool.query(`SELECT *FROM users WHERE id =$1`, [decoded.email])

        const user = userData.rows[0]
//check if user exists or not
     if(userData.rows.length===0)
     {
        return res.status(404).json({ message: 'User not found' })
     }
     //check if user is active or not
     if(user.is_active === false)
     {
        return res.status(403).json({ message: 'User is not active' })
     }

     if(roles.length && !roles.includes(user.role))
     {
        return res.status(403).json({ message: 'Forbidden' })
     }

     req.user = decoded;
     next()
   }
}

export default auth;