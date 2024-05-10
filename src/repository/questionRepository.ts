import { UUID } from 'crypto'
import supabase from './scripts/db'

const findById = (mahasiswaId : UUID) => {
    return supabase
        .from('pertanyaan')
        .select()
        .eq('id_mahasiswa', mahasiswaId)
}

const create = (siswaId : UUID, mahasiswaId : UUID, question : String) => {
    return supabase
        .from('pertanyaan')
        .insert({ id_siswa: siswaId, id_mahasiswa: mahasiswaId, pertanyaan: question})
}

const remove = (pertanyaanId : UUID) => {
    return supabase
        .from('pertanyaan')
        .delete()
        .eq('id', pertanyaanId)
}

const upVote = (pertanyaanId : UUID) => {
    return supabase.rpc('upvote', {questionid : pertanyaanId})
}

export { findById, create, remove, upVote };