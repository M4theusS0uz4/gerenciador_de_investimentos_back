import fs from'fs'
import path  from 'path'
import winston  from 'winston'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const logDir = path.resolve(__dirname, '../../../', 'logs');


if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
}


const logger = winston.createLogger({
    level:'info',
    format: winston.format.combine(
        winston.format.timestamp({format:'YYYY-MM-DD HH:mm:ss'}),
        winston.format.printf(({level, message, timestamp}) => `${timestamp} [${level.toUpperCase()}] : ${message}`)
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({filename: path.join(logDir,'app.log')})

    ]
});

export default logger;