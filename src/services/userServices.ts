import { Request, Response } from 'express';
import { findAll, findById } from '../repository/userRepository';
import { UUID } from 'crypto';

const getAllUsers = async (req: Request, res: Response) => {
    try {
        const all = await findAll();
        res.status(200).send(all);
    } catch (error) {
        console.error('Fetching user failed:', error.message);
        return res.status(500).json({ error: 'Fetching user failed: ' + error.message });
    }
};

const getUserById = async (req: Request<{ id: UUID }>, res: Response) => {
    try {
        const userId = req.params.id;
        const user = await findById(userId);

        if (user !== null) {
            res.status(200).send(user);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error('Fetching user failed:', error.message);
        return res.status(500).json({ error: 'Fetching user failed:' + error.message });
    }
};

export { getAllUsers, getUserById };
