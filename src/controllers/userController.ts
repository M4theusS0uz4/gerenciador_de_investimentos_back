import { Request, Response } from "express";
import bcrypt from 'bcryptjs'
import prisma from '../prisma/prismaClient'

export const register = async (req:Request, res:Response) => {
    const {username ,email, password} = req.body;
    
    if(!username  || !email || !password){
        return res.status(400).json({message:"All of field must be filled in."})
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
        return res.status(400).json({message:"The email format or the email incorrect."})
      }

      const newUser = await prisma.user.create({
        data:
      })

    
}