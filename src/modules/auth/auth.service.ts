import { pool } from '../../db';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from '../../config';

const loginUserIntoDB = async(payload: any) => {
    // Database logic to authenticate user
const { email, password } = payload;

const userData = await pool.query(`SELECT * FROM users WHERE email =$1`,[email]);

if(userData.rows.length === 0) {
    throw new Error('User not found');
}
const user = userData.rows[0];

 const matchPassword = await bcrypt.compare(password, user.password);

 if(!matchPassword) {
    throw new Error('Invalid password');
 }

// jwt token generate kora hobe ekhane, but for now just return user data
//step 1: create a payload for jwt token
const jwtPayload = {
    id: user.id,
    email: user.email,
    name: user.name,
    is_active: user.is_active
}


//step 2: sign the token with a secret key and set an expiration time


const jwtAccessToken = jwt.sign(jwtPayload, config.secret, { expiresIn: "2d" });

return { ...jwtPayload, accessToken: jwtAccessToken };
}

export const authService = {
    loginUserIntoDB
}
