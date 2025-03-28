import { UAParser } from 'ua-parser-js';

export function getClientInfo(req) {
    let userIp = req.headers['x-forwarded-for']
        ? req.headers['x-forwarded-for'].split(',')[0].trim()
        : req.socket?.remoteAddress || req.connection?.remoteAddress;

    if (userIp.startsWith("::ffff:")) {
        userIp = userIp.substring(7);
    } 
    if (userIp.endsWith("::ffff:")) {
        userIp = userIp.substring(0, userIp.length - 6);
    }
    if (userIp === '::1' || userIp === '127.0.0.1') {
        userIp = 'localhost';
    }

    // Captura o User-Agent (navegador)
    const userAgent = req.headers['user-agent'];
    const parser = new UAParser(userAgent);
    const browserInfo = parser.getResult();

    return {
        ip: userIp,
        browser: browserInfo.browser.name || "Desconhecido",
        version: browserInfo.browser.version || "N/A",
        os: browserInfo.os.name || "Desconhecido",
        device: browserInfo.device.type || "Desktop"
    };
}

