import logger from '../../src/services/log-service/utils/logger.js';

const errorHandler = (err, req, res, next) => {
    logger.error(`Erro no API Gateway: ${err.message} Stack: ${err.stack}`);

    res.status(err.status || 500).json({
        error: true,
        message: 'Erro interno no API Gateway'
    });
};

export default errorHandler;