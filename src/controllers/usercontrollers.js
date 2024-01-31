import userModel from '../models/user.js'
import bcryptjs from 'bcryptjs';
import Jwt from 'jsonwebtoken';

const SECRET_KEY = "S3cr3t"

export const signUp = async (req, res) => {
    
    const {username, email, password} = req.body;
    try {
        const existingUser = await userModel.findOne({ email : email })
        if(existingUser){
            return res.status(400).json({message: "User alredy exists"})
        }
        const hashedPassword = bcryptjs.hashSync(password, 10);
        const result = await userModel.create({
            username,
            email,
            password: hashedPassword,
          });
        const token = Jwt.sign({email : result.email, id : result._id}, SECRET_KEY);
        res.status(201).json({user: result, token: token })  
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Something went worng"})
    }
}


export const signIn = async (req, res) => {
    const {email, password} = req.body;
    try {
        const existingUser = await userModel.findOne({ email : email })
        if(!existingUser){
            return res.status(400).json({message: "user not found"})
        }

        const matchPassword = await bcryptjs.compare(password, existingUser.password)
        if(!matchPassword){
            return res.status(400).json({message: "Invelid Credentials"})
        }

        const token = Jwt.sign({email : existingUser.email, id : existingUser._id}, SECRET_KEY);
        res.status(201).json({user: existingUser, token: token }) 

    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Something went worng"})
    } 
}
