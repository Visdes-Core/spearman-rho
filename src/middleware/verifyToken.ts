require("dotenv").config();

import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization.split(' ')[1];
    const secretKey = process.env.JWT_SECRET_KEY

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized: Token not found' });
    }

    try {
        const decoded = jwt.verify(token, secretKey) as { [key: string]: any };
        res.locals.userId = decoded.userId

        next();
    } catch (e) {
        console.error('Error while verifying token:', e.message);
        return res.status(401).json({ error: 'Unauthorized: ' + e.message });
    }
};

export { verifyToken }