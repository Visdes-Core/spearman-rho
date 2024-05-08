require("dotenv").config();
import jwt from 'jsonwebtoken';
import passwordValidator from 'password-validator';
import { Request, Response } from 'express';
import { login, signup } from '../repository/authRepository'

const schema = new passwordValidator();

schema
  .is().min(8, 'Oops! Terlalu pendek nih, minimal 8 karakter, ya!')
  .is().max(64, 'Wah, terlalu panjang! Maksimal 64 karakter, ya!')
  .has().uppercase(1, 'Eh, perlu ada huruf besar nih, masukkan setidaknya satu!')
  .has().lowercase(1, 'Ups, kelupaan huruf kecil, tambahkan setidaknya satu!')
  .has().digits(1, 'Waduh, kurang angka nih, tambahkan setidaknya satu!');

const signupService = async (req : Request, res : Response) => {
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

        const { data, error } = await signup (email, password);

        if (error) {throw error}
    
        res.status(200).send({message: "User Succesfully Created!"})

    } catch (e){
        res.status(400).send({message: "User Registration Failed!: " + e})
    }
}

const loginService = async (req : Request, res : Response) => {
    try {
        const { email, password } = req.body;

        const { data, error } = await login(email, password)
    
        if (error) {throw error}

        const userId = data.user.id;
        const token = generateJWT(userId)
    
        res.status(200).send({message:"Logged in Succesfully", token: token})

    } catch (e){
        res.status(400).send({message: "Login Failed!: " + e})
    }

}

const validateEmail = (email : string) => {
    const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return pattern.test(email);
}

const generateJWT = (userId: string) => {

    const SECRET_KEY = process.env.JWT_SECRET_KEY;

    const payload = {
        userId: userId,
        exp: Math.floor(Date.now() / 1000) + (60 * 60)
    };

    const jwtToken = jwt.sign(payload, SECRET_KEY!);
    return jwtToken;
}

module.exports = { loginService, signupService };