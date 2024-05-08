import supabase from '../db'

export const login = (email : string, password : string) => {
    return supabase.auth.signInWithPassword({
        email: email,
        password: password
    })
}

export const signup = (email : string, password : string) => {
    return supabase.auth.signUp({
        email: email,
        password: password
    })
}

module.exports = { login, signup };