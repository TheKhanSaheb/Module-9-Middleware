import { pool } from "../../db";
import bcrypt from "bcryptjs";
const createProfileInDB =async(payload: any)=>
{
    const{ user_id, bio, address, phone, gender } = payload

   

    const user = await pool.query(`SELECT * FROM users WHERE id = $1`, [user_id])

    if(user.rowCount === 0)
    {
        throw new Error('User not found')
    }
    const result = await pool.query(
        `INSERT INTO profiles (user_id, bio, address, phone, gender) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
        [user_id, bio, address, phone, gender]
    )
    return result

}

export const profileService = {
    createProfileInDB
}