import prisma  from '../../../prisma/prismaClient.js';
import logger from '../utils/logger.js';

export async function createLog(data){
    try{
        await prisma.log.create({
            data:{
                user_id: data.user_id,
                log_type: data.log_type, 
                description: data.description,
                details: data.details
            }
        });
        logger.info(`Log registrado no banco: ${data.description}`)
    }catch(error){
        logger.error(`Erro ao salvar log no banco: ${error.message}`)
    }
}

