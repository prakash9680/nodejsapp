const jwt = require('jsonwebtoken');
const bearerToken = require('bearer-token');
const { sendResponse } = require('./../../services/helper');

const authenticateToken = (req, res, next) => {
    bearerToken(req, (err, token) => {        
        if (token == null) return sendResponse(res, 401, 'No token provided', null);
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) return sendResponse(res, 403, 'Invalid token', null);
            req.user = user;
            next();
        });
    });
};

module.exports = authenticateToken;