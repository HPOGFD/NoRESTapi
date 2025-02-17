import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface AuthRequest extends Request {
  user?: any;
}

const secret = process.env.JWT_SECRET || 'mysecretsshhhhh';

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  // Allow OPTIONS requests to pass through without authentication
  if (req.method === 'OPTIONS') {
    return next();
  }

  // Look for the token in the Authorization header
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'You are not authenticated!' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};


export const signToken = (user: any) => {
    return jwt.sign({ id: user._id, email: user.email }, secret, { expiresIn: '2h' });
  };
  

