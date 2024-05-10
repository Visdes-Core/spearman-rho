import { UUID } from 'crypto'
import supabase from './scripts/db'

const findById = (questionId : UUID) => {
    return supabase
        .from('jawaban')
        .select()
        .eq('id_mahasiswa', questionId)
}

const create = (mahasiswaId : UUID, pertanyaanId : UUID,  jawaban : String) => {
    return supabase
        .from('jawaban')
        .insert({ id_mahasiswa: mahasiswaId, id_pertanyaan: pertanyaanId, jawaban: jawaban})
}

const remove = (jawabanId : UUID) => {
    return supabase
        .from('jawaban')
        .delete()
        .eq('id', jawabanId)
}

export { findById, create, remove };