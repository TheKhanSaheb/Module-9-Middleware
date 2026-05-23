import type { Request, Response } from "express"
import { pool } from "../../db"
import { userService } from "./user.service"



const createUser =  async (req: Request, res: Response) => {
        const { name, email, password, age } = req.body
    
        try {
           //the user data will be inserted into the database using the pool.query method
           //and this is pasted on service.ts for better modularity and separation of concerns.
           const result = await userService.createUserIntoDB(req.body)
    
            res.status(200).json({
                message: 'User inserted successfully',
                data: result
            })
        } catch (error) {
            console.error('Error inserting user data:', error)
    
            res.status(500).json({
                error: 'Internal Server Error',
                data: error
            })
        }
    }


    const getAllUsers = async (req: Request, res: Response) => {
        try {
          
    const result = await userService.getAllUsersFromDB()
            res.status(200).json({
                message: 'Users fetched successfully',
                data: result.rows
            })
    
    
    
    
        }
       
       
       
        catch (error) {
            console.error('Error fetching users:', error)
            res.status(500).json({
                error: 'Internal Server Error',
                data: error
            })
        }
    
    
    }


    const getUserById = async (req: Request, res: Response) => {
        const userId = req.params.id
    
        try {
            const result =await userService.getUserByIdFromDB(Number(userId))
             res.status(200).json({
                message: 'Users fetched successfully',
                data: result.rows
            })

           
    
    
        } catch (error) {
            console.error('Error fetching user:', error)
            res.status(500).json({
                error: 'Internal Server Error',
                data: error
            })
        }
    }

    const updateUserById = async (req: Request, res: Response) => {
        const userId = req.params.id
        const { name, email, password, age } = req.body
    
        try {
            
            const result =await userService.updateUserByDB(req.body, Number(userId))
                res.status(200).json({
                    message: 'User updated',
                    successfully: true,
                    data: result.rows[0]

                })
       
       
       
       
       
        } catch (error) {
            console.error('Error updating user:', error)
            res.status(500).json({
                error: 'Internal Server Error',
                data: error
            })
        }
    }

    const deleteUserById = async (req: Request, res: Response) => {
     const userId = req.params.id
    try {
        const result = await userService.deleteUserByIdFromDB(Number(userId))
        res.status(200).json({
            message: 'User deleted successfully',
            data: result.rows[0]
        })
       


     
    } catch (error) {
        console.error('Error deleting user:', error)
        res.status(500).json({
            error: 'Internal Server Error',
            data: error
        })
    }
}

    

 

    export const userController = {
        createUser,
        getAllUsers,
        getUserById,
        updateUserById,
        deleteUserById
    }