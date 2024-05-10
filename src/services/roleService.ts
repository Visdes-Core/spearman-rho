import { Request, Response } from 'express';
import { createSiswa, createMahasiswa } from '../repository/roleRepository';

const roleSiswa = async (req : Request, res : Response) => {

    try {

        if (res.locals.role != undefined) {
            res.status(401).send({ message: "You already have role" })
        }

        const { nama, kelas, preferensi_jurusan } = req.body;
        const userId = res.locals.userId

        await createSiswa(userId, nama, kelas, preferensi_jurusan);

        res.status(200).send({message:"New siswa succesfully added!"})

    } catch (e){
        console.error('Adding siswa failed:', e.message);
        return res.status(401).json({ error: 'Adding siswa failed' + e.message});
    }

}

const roleMahasiswa = async (req : Request, res : Response) => {

    try {

        if (res.locals.role != undefined) {
            res.status(401).send({ message: "You already have role" })
        }

        const { nama, asal_universitas, angkatan, jurusan, minat, organisasi, pencapaian } = req.body;
        const userId = res.locals.userId

        await createMahasiswa(userId, nama, asal_universitas, angkatan, jurusan, minat, organisasi, pencapaian );

        res.status(200).send({message:"New mahasiswa succesfully added!"})

    } catch (e){
        console.error('Adding mahasiswa failed:', e.message);
        res.status(401).send({error: "Adding mahasiswa failed: " + e.message})
    }
}

const roleCheck = async (req : Request, res : Response) => {

    if (res.locals.role != undefined) {
        res.status(200).send({role: res.locals.role})
        return;
    }
    res.status(200).send({role: 'unenrolled'})    
}
export {roleSiswa, roleMahasiswa, roleCheck}