require("dotenv").config();
import { roleCheck } from '../repository/roleRepository'

import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';

const verifyRole = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization.split(' ')[1];
    const secretKey = process.env.JWT_SECRET_KEY
    try {
        const decoded = jwt.verify(token, secretKey) as { [key: string]: any };
        const { siswaData, mahasiswaData } = await roleCheck(decoded.userId)

        if (siswaData.length != 0){
            res.locals.role = 'siswa'
        }

        if (mahasiswaData.length != 0){
            res.locals.role = 'mahasiswa'
        }

        next();
    } catch (e) {
        console.error('Error while checking role:', e.message);
        return res.status(401).json({ error: 'Error while checking role:' + e.message });
    }
};

export { verifyRole }