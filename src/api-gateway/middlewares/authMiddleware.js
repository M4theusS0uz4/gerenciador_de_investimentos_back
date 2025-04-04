import jwt from 'jsonwebtoken';
import config from '../../config/env.js'

const JWT_SECRET_KEY = config.JWT_SECRET;

export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    
    if(!authHeader){
        return res.status(401).json({message:"Token de autenticação não fornecido"})
    }

    const token = authHeader.split(' ')[1];

    if(!token){
        return res.status(401).json({message:"Token malformado ou ausente"})
    }

    jwt.verify(token, JWT_SECRET_KEY, (err,user) =>{
        if(err){
            return res.status(403).json({message:"Token inválido ou expirado."});
        }

    req.user = user;
    next();
    });
};
