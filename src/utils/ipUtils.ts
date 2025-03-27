function getIp(req: any){
    let userIp = req.headers['x-forwarded-for']
        ? req.headers['x-forwarded-for'].split(',')[0].trim() // Aplica .trim() corretamente
        : req.socket?.remoteAddress || req.connection?.remoteAddress;
    if(userIp.startsWith(" ::ffff:")) {
        userIp = userIp.substring(userIp.indexOf(7));
    }if(userIp.endsWith("::ffff:")) {
        userIp = userIp.substring((userIp).indexOf(6));
    }
    if (userIp === '::1' || userIp === '127.0.0.1') {
        userIp = 'localhost';
    }
    return userIp;
}

module.exports = { getIp };