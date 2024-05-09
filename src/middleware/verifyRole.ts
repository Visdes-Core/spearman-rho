require("dotenv").config();
import { roleCheck } from '../repository/roleRepository'

import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';

const verifyRole = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization.split(' ')[1];
    const secretKey = process.env.JWT_SECRET_KEY
    try {
        const decoded = jwt.verify(token, secretKey) as { [key: string]: any };
        const { data } = await roleCheck(decoded.userId)

        if (data.length != 0) return res.status(401).json({ error: 'You already have role' });

        next();
    } catch (e) {
        console.error('Error while checking role:', e.message);
        return res.status(401).json({ error: 'Error while checking role:' + e.message });
    }
};

export { verifyRole }