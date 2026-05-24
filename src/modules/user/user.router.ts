import { Router } from "express";
import app from "../../app";
import { pool } from "./../../db/index";
import { type Request, type Response } from "express";
import { userController } from "./user.controller";
import auth from "../../middleware/auth";
import { USER_ROLE } from "../../types";
// import auth from "../../middleware/auth";

const{ createUser, getAllUsers, getUserById, updateUserById, deleteUserById } = userController
const router =Router()


{

   

    router.post('/', userController.createUser)



    router.get('/',auth(USER_ROLE.ADMIN,USER_ROLE.AGENT),userController.getAllUsers)

    router.get('/:id', userController.getUserById)


    router.put('/:id', userController.updateUserById)

    router.delete('/:id',userController.deleteUserById)

    

   




    
    





}


//router ta ke export kore dibo jate onno jaygay use korte pari
export const userRouter = router;