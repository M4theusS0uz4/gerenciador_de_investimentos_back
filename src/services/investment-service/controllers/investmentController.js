import logger from '../../log-service/utils/logger.js'
import prisma from '../../../prisma/prismaClient.js';

export const createInvestment = async (req,res) => {
    const {id_user, name,targetAmount, objective, amount} = req.body;
    if(!id_user, name, targetAmount, objective){
        res.status(400).json({message: "The fields must filled"})
    }
    const urlInvestmentImg = `${id_user}_${name}`;
    console.log(urlInvestmentImg)
    try{
    const newInvestment = await prisma.investment.create({
        data:{
        name:name,
        amount: amount,
        target_amount: targetAmount,
        image_url: urlInvestmentImg,
        objective: objective,
        user:{
            "connect":{"id_user":id_user}
        }
    }
    })
    if(newInvestment){
        logger.info("Investiment created sucessfully.")
        return res.status(200).json("Investment created")
    }else{
        logger.info("Error in to create the investment!")
        return res.status(400).json("Error in to create the investment!")
    }
    }catch(error){
        console.log(error)
        logger.error("Error in to create the investment")
        return res.status(500).json("Error in to create investment")
    }
}