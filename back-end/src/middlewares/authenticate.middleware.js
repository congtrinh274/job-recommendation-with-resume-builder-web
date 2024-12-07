const { decodeToken } = require('../utils/jwt.js');

const authenticateToken = async (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).json({ message: 'No token provided' });

    try {
        const decoded = await decodeToken(token);
        req.user = decoded.payload;
        next();
    } catch (err) {
        return res.status(302).json({ message: 'Invalid token' });
    }
};

module.exports = authenticateToken;
