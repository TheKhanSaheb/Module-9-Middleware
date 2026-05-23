import { Pool } from "pg"
import config from "../config"

export const pool = new Pool({
    connectionString: config.connection_string
})

// Initialize database
export const initDB = async () => {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL,
                is_active BOOLEAN DEFAULT TRUE,
                age INT,
                created_at TIMESTAMP DEFAULT NOW()
            )
        `)


        await pool.query(`
            CREATE TABLE IF NOT EXISTS profiles (
                id SERIAL PRIMARY KEY,
                user_id INT REFERENCES users(id) ON DELETE CASCADE,

                bio TEXT,
                address TEXT,
                phone VARCHAR(15),
                gender VARCHAR(10),
                created_at TIMESTAMP DEFAULT NOW()
            )
        `)
        
        console.log('Database initialized successfully')
    } catch (error) {
        console.error('Error initializing database:', error)
    }
}