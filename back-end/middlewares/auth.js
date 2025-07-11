import dotenv from 'dotenv'
import jwt from 'jsonwebtoken';
dotenv.config()

const verifyAuth = (req, res, next) => {
  const token = req.header('token') || req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }
 
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY); 
    req.user = decoded; 
    
    next();

  } catch (err) {
    return res.status(403).json({ message: 'Invalid or expired token.' });
  }
};

export default verifyAuth;