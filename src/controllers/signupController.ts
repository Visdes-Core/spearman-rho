import supabase from '../db'
import passwordValidator from 'password-validator';

import {Request, Response} from 'express';

const schema = new passwordValidator();

schema
  .is().min(8, 'Oops! Terlalu pendek nih, minimal 8 karakter, ya!')
  .is().max(64, 'Wah, terlalu panjang! Maksimal 64 karakter, ya!')
  .has().uppercase(1, 'Eh, perlu ada huruf besar nih, masukkan setidaknya satu!')
  .has().lowercase(1, 'Ups, kelupaan huruf kecil, tambahkan setidaknya satu!')
  .has().digits(1, 'Waduh, kurang angka nih, tambahkan setidaknya satu!');

const signupController = async (req : Request, res : Response) => {
    try {
        const {username, email, password, reenter_password} = req.body;

        if (!validateEmail(email)){
            res.status(400).send({message: "Invalid Email Format!"})
            return;
        }

        if (password !== reenter_password) {
            res.status(400).send({message: "Password Dont Match!"})
            return;
        }
        
        if (!schema.validate(password)) {
            res.status(400).json({
                error: 'Invalid Password',
                details: schema.validate(password, {details: true})
            });
            return;
        }

        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password
        })

        if (error) {throw error}
    
        res.status(200).send({message: "User Succesfully Created!"})

    } catch (e){
        res.status(400).send({message: "User Registration Failed!: " + e})
    }
}

const validateEmail = (email : string) => {
    const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return pattern.test(email);
}

module.exports = { signupController };