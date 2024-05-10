import supabase from '../scripts/db'

const login = (email : string, password : string) => {
    return supabase.auth.signInWithPassword({
        email: email,
        password: password
    })
}

const signup = (email : string, password : string) => {
    return supabase.auth.signUp({
        email: email,
        password: password
    })
}

export { login, signup };