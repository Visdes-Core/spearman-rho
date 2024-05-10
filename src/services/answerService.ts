import { Request, Response } from 'express';
import {  findById, create, remove  } from '../repository/answerRepository'
import { UUID } from 'crypto';

const createAnswer = async (req : Request, res : Response) => {
    try {

        if (res.locals.role != 'mahasiswa') {
            res.status(401).send({ message: "You are not mahasiswa" })
        }
        
        const mahasiswaId = res.locals.userId
        const questionId = req.body.id_pertanyaan
        const answer = req.body.jawaban

        const { data, error } = await create(mahasiswaId, questionId, answer);

        if (error) { throw error}

        res.status(200).send({ message: "Answer succesfully created!" })

    } catch (error) {
        console.error('Create answer failed:', error.message);
        return res.status(500).json({ error: 'Create answer failed:' + error.message });
    }
}

const getAnswer = async (req: Request<{ id: UUID }>, res: Response) => {
    try {
        const questionId = req.params.id;
        const { data, error } = await findById(questionId);

        if (error) { throw error}

        res.status(200).send(data)

    } catch (error) {
        console.error('Fetching answer failed:', error.message);
        return res.status(500).json({ error: 'Fetching answer failed:' + error.message });
    }
}

const deleteAnswer = async (req : Request<{ id: UUID }>, res : Response) => {
    try {
        const questionId = req.params.id;
        const { data, error } = await remove(questionId);

        if (error) { throw error}

        res.status(200).send({ message: "Answer succesfully deleted!" })

    } catch (error) {
        console.error('Delete answer failed:', error.message);
        return res.status(500).json({ error: 'Delete answer failed:' + error.message });
    }
}


export {createAnswer, getAnswer, deleteAnswer }