import {type Request, type Response,type  NextFunction } from 'express'
import fs from 'fs'

const logger =(req:Request, res:Response, next:NextFunction) => {
    console.log(`${req.method} ${req.url}`)
   const log =`\nMethod: ${req.method}, URL: ${req.url}, Time: ${new Date().toISOString()}\n`
fs.appendFile('logger.txt',log,(err)=>{
    if(err){
        console.error('Error writing to log file',err)
    }})

   
    next()
}

export default logger

export const middleware={
    logger
}