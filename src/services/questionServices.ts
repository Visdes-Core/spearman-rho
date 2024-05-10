import { Request, Response } from 'express';
import {  findById, create, remove, upVote } from '../repository/questionRepository'
import { UUID } from 'crypto';

const createQuestion = async (req : Request, res : Response) => {
    try {

        if (res.locals.role != 'siswa') {
            res.status(401).send({ message: "You are not siswa" })
        }
        
        const siswaId = res.locals.userId
        const mahasiswaId = req.body.id_mahasiswa
        const question = req.body.pertanyaan

        const { data, error } = await create(siswaId, mahasiswaId, question);

        if (error) { throw error}

        res.status(200).send({ message: "Question succesfully created!" })

    } catch (error) {
        console.error('Create question failed:', error.message);
        return res.status(500).json({ error: 'Create question failed:' + error.message });
    }
}

const getQuestions = async (req: Request<{ id: UUID }>, res: Response) => {
    try {
        const userId = req.params.id;
        const { data, error } = await findById(userId);

        if (error) { throw error}

        res.status(200).send(data)

    } catch (error) {
        console.error('Fetching questions failed:', error.message);
        return res.status(500).json({ error: 'Fetching questions failed:' + error.message });
    }
}

const deleteQuestion = async (req : Request<{ id: UUID }>, res : Response) => {
    try {
        const questionId = req.params.id;
        const { data, error } = await remove(questionId);

        if (error) { throw error}

        res.status(200).send({ message: "Question succesfully deleted!" })

    } catch (error) {
        console.error('Delete question failed:', error.message);
        return res.status(500).json({ error: 'Delete question failed:' + error.message });
    }
}

const upVoteQuestion = async (req : Request<{ id: UUID }>, res : Response) => {
    try {
        const questionId = req.params.id;
        const { data, error } = await upVote(questionId);

        if (error) { throw error}

        res.status(200).send({ message: "Upvote sent!" })

    } catch (error) {
        console.error('Upvote failed:', error.message);
        return res.status(500).json({ error: 'Upvote failed:' + error.message });
    }
}


export {getQuestions, createQuestion, deleteQuestion, upVoteQuestion}