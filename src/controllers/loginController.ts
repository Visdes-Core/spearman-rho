require("dotenv").config();
import supabase from '../db'
import jwt from 'jsonwebtoken';
import {Request, Response} from 'express';


const loginController = async (req : Request, res : Response) => {
    try {
        const { email, password } = req.body;

        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        })
    
        if (error) {throw error}

        const userId = data.user.id;
        const token = generateJWT(userId)
    
        res.status(200).send({message:"Logged in Succesfully", token: token})

    } catch (e){
        res.status(400).send({message: "Login Failed!: " + e})
    }

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

module.exports = { loginController };