import e from "express";
import { pool } from "../../db"
import type { IUser } from "./user.interface";
import bcrypt from "bcryptjs";

const createUserIntoDB = async (payLoad:IUser) => {
    const { name, email, password, age } = payLoad;

     const hashPassword = await  bcrypt.hash(password, 10);

    const result = await pool.query(
        'INSERT INTO users (name, email, password, age) VALUES ($1, $2, $3, $4) RETURNING *',
        [name, email, hashPassword, age]
    );
// delete result.rows[0].password; // Remove password from the returned user object
    delete result.rows[0].password; // Remove password from the returned user object
    return result.rows[0];
};


const getAllUsersFromDB = async () => {
    const result = await pool.query('SELECT * FROM users');
     delete result.rows[0].password;
    return result;
};

const getUserByIdFromDB = async (userId: number) => {
     const result = await pool.query(`SELECT * FROM users WHERE id = $1`, [userId])
            delete result.rows[0].password;
    return result;
         
};

const updateUserByDB  = async (payLoad:IUser, userId: number)=>
{
        const { name, email, password, age } = payLoad
        const hashPassword = await bcrypt.hash(password, 10);
    const result = await
    
                pool.query(
                    `UPDATE users SET name = $1, email = $2, password = $3, age = $4 WHERE id = $5 RETURNING *`,
                    [name, email, hashPassword, age, userId]
                )
                return result;
}

const deleteUserByIdFromDB = async (userId: number) => {
     const result = await
            pool.query(`DELETE FROM users WHERE id = $1 RETURNING *`, [userId])
            return result;
};
export const userService = {
    createUserIntoDB,
    getAllUsersFromDB,
    getUserByIdFromDB,
    updateUserByDB,
    deleteUserByIdFromDB
}