import prisma  from '../../../prisma/prismaClient.js';
import logger from '../utils/logger.js';

export async function createLog(req,res){
    try{
        const data = req.body;
        await prisma.log.create({
            data:{
                user_id: data.user_id,
                log_type: data.log_type, 
                description: data.description,
                details: data.details
            }
        });
        logger.info(`Log registrado no banco: ${data.description}`)
        res.sendStatus(200)
    }catch(error){
        logger.error(`Erro ao salvar log no banco: ${error.message}`)
        res.sendStatus(500)
    }
}

