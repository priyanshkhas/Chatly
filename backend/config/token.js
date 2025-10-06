import jwt from 'jsonwebtoken';
const genToken  = async (id) =>{
     try{
       const token = await jwt.sign({userId}, process.env.JWT_SECRET, {expiresIn:"7d"})
       return token;
     }catch(error){
        console.log("Error while generating token", error);
     }

}
export default genToken;