import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


async function shutdown(){
    await prisma.$disconnect();
}

process.on('SIGINT',shutdown)
process.on('SIGTERM',shutdown) 
export default prisma;