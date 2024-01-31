import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
dotenv.config();

process.env.MONGOOSE_URL
const key = process.env.SECRET_KEY


export const auth = (req, res, next) => {
    try {
        let token = req.headers.authorization
        if(token){
            token = token.split(" ")[1];
            let user = jwt.verify(token, key)
            req.userId = user.id;

        }else{
            res.status(400).json({message: "Unauthorized user"})
        }
        next();
    } catch (error) {
        console.log(error);
        res.status(400).json({message: "Unauthorized user"})
    }
}