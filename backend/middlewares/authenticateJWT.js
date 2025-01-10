const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

function authenticateJWT( req, res, next){
    const token = req.header('Authorization')?.replace('Bearer ', '')

    if (!token){
        return res.status(401).json({message: 'Access denied. No token found.'})
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next()
        
    } catch (error) {
        res.status(403).json({ message: 'Invalid or expired token' });
    }
}

module.exports = authenticateJWT