import { UUID } from 'crypto';
import supabase from './scripts/db'

interface Organisasi {
    nama_organisasi : string,
    jabatan : string,
    mulai_masa_jabatan : Date,
    akhir_masa_jabatan : Date,
}

interface Pencapaian {
    nama_pencapaian : string,
    tahun : Date,
    deskripsi : string
}

const createSiswa = async (userId : UUID, nama : string, kelas : string , preferensi_jurusan : string[]) => {

    const { data: siswaData, error: siswaError } = await supabase
        .from('siswa')
        .insert([{ id : userId, nama, kelas }])
        .select("id");
    
    if (siswaError) {
        console.error('Error inserting data into siswa table:', siswaError.message);
        return;
    }

    const promises = preferensi_jurusan.map(async (preferensiValue) => {
        const { error: preferensiError } = await supabase
            .from('preferensi_jurusan_siswa')
            .insert([{ id_siswa : userId, preferensi_jurusan: preferensiValue }]);
        
        if (preferensiError) {
            console.error('Error inserting data into preferensi_jurusan_siswa table:', preferensiError.message);
            return;
        }
    });

    await Promise.all(promises);
}

const createMahasiswa = async (userId : UUID, nama : string, asal_universitas : string, angkatan : Date, jurusan : string, minat : string[], organisasi : Organisasi[], pencapaian : Pencapaian[]) => {

    const { data: mahasiswaData, error: mahasiswaError } = await supabase
        .from('mahasiswa')
        .insert([{ id : userId, nama, asal_universitas, angkatan, jurusan }])
        .select("id");
    
    if (mahasiswaError) {
        console.error('Error inserting data into mahasiswa table:', mahasiswaError.message);
        return;
    }

    let minatPromises, organisasiPromises, pencapaianPromises;

    if (minat != null) {
        minatPromises = minat.map(async (minatValue) => {
            const { error: minatError } = await supabase
                .from('minat_mahasiswa')
                .insert([{ id_mahasiswa : userId, minat : minatValue }]);
            
            if (minatError) {
                console.error('Error inserting data into minat_mahasiswa table:', minatError.message);
                return;
            }
        });
    }

    if (organisasi != null) {
        organisasiPromises = organisasi.map(async (organisasiValue) => {

            const {nama_organisasi, jabatan, mulai_masa_jabatan, akhir_masa_jabatan} = organisasiValue;

            const { error: organisasiError } = await supabase
                .from('organisasi_mahasiswa')
                .insert([{ id_mahasiswa : userId, nama_organisasi, jabatan, mulai_masa_jabatan, akhir_masa_jabatan}]);
            
            if (organisasiError) {
                console.error('Error inserting data into organisasi_mahasiswa table:', organisasiError.message);
                return;
            }
        });
    }

    if (pencapaian != null) {
        pencapaianPromises = pencapaian.map(async (pencapaianValue) => {

            const {nama_pencapaian, tahun, deskripsi } = pencapaianValue;

            const { error: pencapaianError } = await supabase
                .from('pencapaian_mahasiswa')
                .insert([{ id_mahasiswa : userId, nama_pencapaian, tahun, deskripsi }]);
            
            if (pencapaianError) {
                console.error('Error inserting data into pencapaian_mahasiswa table:', pencapaianError.message);
                return;
            }
        });
    }

    await Promise.all([minatPromises, organisasiPromises, pencapaianPromises]);
}

const roleCheck = async (userId : UUID) => {

    const { data : siswaData }= await supabase
        .from ('siswa')
        .select ('id')
        .eq('id', userId) 

    const { data : mahasiswaData } = await supabase
        .from ('mahasiswa')
        .select ('id')
        .eq('id', userId) 

    return { siswaData, mahasiswaData }
}

export { createSiswa, createMahasiswa, roleCheck };