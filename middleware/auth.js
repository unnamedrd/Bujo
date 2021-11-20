const jwt = require('jsonwebtoken');
var dotenv = require('dotenv');
dotenv.config();

module.exports = function(req, res, next) {
    const token = req.header('x-auth-token');
    const secret = process.env.JWT_SECRET;

    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    try {
        jwt.verify(token, secret, (err, decoded) => {
            if (err) {
                return res.status(401).json({ msg: 'Token is not valid' });
            } else {
            req.user = decoded.user;
            next();
            }
        });
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
};

