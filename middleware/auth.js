import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
    // Get token from header
    const token = req.header('Authorization');

    // Check if no token
    if (!token) {
        return res.status(401).json({ error: 'No token, authorization denied' });
    }

    try {
        // Token typically comes as "Bearer <token>"
        const tokenString = token.startsWith('Bearer ') ? token.split(' ')[1] : token;
        
        // Verify token
        const decoded = jwt.verify(
            tokenString, 
            process.env.JWT_SECRET || 'fallback_secret_key_change_me_in_production'
        );
        
        // Add user payload to request
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ error: 'Token is not valid' });
    }
};

export default authMiddleware;
