import {  type Request, type Response } from 'express'
import { authService } from './auth.service';
const loginUser =async(req: Request, res: Response)=>
{ 

    try{
        const result = await authService.loginUserIntoDB(req.body);
        res.status(200).json({ message: 'User logged in successfully', user: result });
    }
    catch(error)
    {
        console.error('Error logging in user:', error);
        res.status(500).json({ message: 'Internal server error' });

    }


}

export const authController = {
    loginUser
}