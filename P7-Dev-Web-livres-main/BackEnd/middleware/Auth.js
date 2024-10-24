const jwt = require('jsonwebtoken'); 

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  
  if (!authHeader) {
    req.auth = { userId: null };  
    return next(); 
  }

  try {
    
    const token = authHeader.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');  
    const userId = decodedToken.userId;
    
    
    req.auth = { userId };
    next();  // 
  } catch (error) {
    
    return res.status(401).json({ error: 'Unauthorized request: Invalid or expired token' });
  }
};
