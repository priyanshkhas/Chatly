import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import genToken  from '../config/token.js';
export const signUp = async (req, res) => {
    try {
       const {username, email, password} = req.body;
       const checkUserByUserName = await User.findOne({username});
       const checkUserByEmail = await User.findOne({email});
       if(checkUserByUserName) {
        return res.status(400).json({message: "Username already exists"});
       }
       if(checkUserByEmail) {
        return res.status(400).json({message: "Email already exists"});
       }
       if(password.length < 6) {
        return res.status(400).json({message: "Password must be at least 6 characters"});
       }

       const hashedPassword = await bcrypt.hash(password, 10);

       const user =await User.create({
        username,
        email,
        password: hashedPassword
       });
       const token = await genToken(user._id);

       res.cookie("token",token  ,{
        httpOnly: true,
        maxAge: 7*24*60*60*1000, // 7 days
        samesize: "None",
        secure: false, // set to true in production
       }) 

        return res.status(201).json({user});
    }catch (error) {
       return res.status(500).json({message: `Error while signup user ${error}`});
    }

}


export const login = async (req, res) => {
    try {
       const {email, password} = req.body;
      
       const user = await User.findOne({email});
       if(!user) {
        return res.status(400).json({message: "User does not exists"});
       }
       
       if(password.length < 6) {
        return res.status(400).json({message: "Password must be at least 6 characters"});
       }

       const hashedPassword = await bcrypt.hash(password, 10);
       
       const isMatch = await bcrypt.compare(password, user.password);
      
       if(!isMatch) {
        return res.status(400).json({message: "Invalid credentials"});
       }
       const token = await genToken(user._id);

       res.cookie("token",token  ,{
        httpOnly: true,
        maxAge: 7*24*60*60*1000, // 7 days
        samesize: "None",
        secure: false, // set to true in production
       }) 

        return res.status(201).json({user});
    }catch (error) {
       return res.status(500).json({message: `Error while login user ${error}`});
    }

}

export const logOut = async (req, res) => {
    try {
        res.clearCookie("token");
        return res.status(200).json({message: "User logged out successfully"});
    }catch (error) {
       return res.status(500).json({message: `Error while logout user ${error}`});
    }
  }    