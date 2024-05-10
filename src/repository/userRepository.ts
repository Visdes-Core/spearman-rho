import { UUID } from 'crypto';
import supabase from '../scripts/db';

const findById = async (userId : UUID) => {
    const userData = await supabase
        .from('users')
        .select(`
            id, email,
            mahasiswa ( nama, asal_universitas, angkatan, jurusan,
                minat_mahasiswa ( minat ),
                organisasi_mahasiswa ( nama_organisasi, jabatan, mulai_masa_jabatan, akhir_masa_jabatan),
                pencapaian_mahasiswa ( nama_pencapaian, tahun, deskripsi)
            ),
            siswa ( nama, kelas, preferensi_jurusan_siswa ( preferensi_jurusan ) )
        `)
        .eq('id', userId);

    return userData.data[0] || null;
};

const findAll = async () => {
    const { data: userList, error } = await supabase.from('users').select();

    if (error) {
        console.error('Error fetching user list:', error.message);
        return [];
    }

    const result = [];

    for (const user of userList) {
        const userData = await findById(user.id);
        result.push(userData);
    }

    return result;
};

export { findAll, findById};
