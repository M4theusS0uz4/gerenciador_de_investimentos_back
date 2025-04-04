import prisma from '../../../prisma/prismaClient.js'
import logger from '../../log-service/utils/logger.js'
import { toLocaleDate } from './../utils/toLocaleDate.js'

export const profile = async (req, res) =>{
    const {userUsername, id_user} = req.query;
    console.log(userUsername, id_user)
    console.log(req.query)
    try{
        const user = await prisma.user.findUnique({
            where: {
                id_user: parseInt(id_user),   
                username: userUsername
            },
        });
        if(!user){
            logger.info("User does not found.")
            return res.status(404).json({message:"User does not found."})
        }
        user.created_at = toLocaleDate(user.created_at)
        console.log(user)
        res.status(200).json({user: user})
    }catch(error){
        console.log(error)
        logger.info("Error in search user")
        return res.status(500).json({message: "Error in search the user" || "Internal server error"})
    }
}