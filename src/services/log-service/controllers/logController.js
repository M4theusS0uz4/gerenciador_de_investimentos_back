import prisma  from '../../../prisma/prismaClient.js';

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
    }catch(error){
        console.log(error)
    }
}

