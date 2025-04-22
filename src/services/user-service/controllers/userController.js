import prisma from '../../../prisma/prismaClient.js'
import logger from '../../log-service/utils/logger.js'
import { toLocaleDate } from './../utils/toLocaleDate.js'
import { comparePassword, hashEmail, hashPassword } from '../../auth-service/utils/authUtils.js'
import { sendEmailPasswordChanged } from '../../email-service/emailService.js'

export const profile = async (req, res) =>{
    const {userUsername, id_user} = req.query;

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
        res.status(200).json({user: user})
    }catch(error){
        console.log(error)
        logger.info("Error in search user")
        return res.status(500).json({message: "Error in search the user" || "Internal server error"})
    }
}

export const changePassword = async (req, res) => {
    const { userUsername, id_user,newPassword, userEmail } = req.body;
    if(!newPassword || !userEmail){
      return res.status(400).json({ message: "New password is required and the user's email too." });
    }
    try {
      const user = await prisma.user.findUnique({
        where: {
          id_user: parseInt(id_user, 10),
          username: userUsername,
        },
      });
      
      if (!user) {
        logger.info("User not found.");
        return res.status(404).json({ message: "User not found." });
      }
      if( hashEmail(userEmail) !== user.email){
        logger.info(`Password changed attemp! ID user:${user.id_user}`)
        return res.status(401).json({ message: "This email informed isn't the same of user's email." });
      }
      const isValid = await comparePassword(newPassword, user.password); 
  
      if (isValid) {
        return res.status(401).json({message: "The new password must be different from the current password.",});
      }
  
      const hashedPassword = await hashPassword(newPassword); // bcrypt.hash ou função custom
      const updatedUser = await prisma.user.update({
        where: { id_user: parseInt(id_user, 10) },
        data: { password: hashedPassword },
      });
      
      logger.info("Password changed successfully.");
      console.log(user.username)
      await sendEmailPasswordChanged(user.username,userEmail);
      return res.status(200).json({ message: `The password was changed! ID user:${updatedUser.id_user}` });
  
    } catch (error) {
      console.error(error);
      logger.error("Error while changing password.");
      return res.status(500).json({ message: "Internal server error." });
    }
  };
