import express, { type Application, type Request, type Response } from 'express'
import { initDB, pool } from './db'
import { userRouter } from './modules/user/user.router'
import { profileRouter } from './modules/profile/profile. routes'
import { authRoute } from './modules/auth/auth.route'

const app: Application = express()


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.text())


// pool and initdb are cut and pasted to db , index.ts for better modularity and separation of concerns.


//user router ke app er sathe use kore dibo
app.use('/api/users', userRouter)
app.use('/api/profiles', profileRouter)
app.use('/api/auth', authRoute)


// Home route
app.get('/', (req: Request, res: Response) => {
    res.send('Server is running')
})
// GET route to fetch all users













// Start server


export default app;