import { PrismaClient } from "@prisma/client";
import dotenv from 'dotenv'

dotenv.config();
const prisma = new PrismaClient({
    datasources: {
      db: {
        url: `${process.env.DATABASE_URL}`, 
      },
    },
  });


async function shutdown(){
    await prisma.$disconnect();
}

process.on('SIGINT',shutdown)
process.on('SIGTERM',shutdown) 
export default prisma;