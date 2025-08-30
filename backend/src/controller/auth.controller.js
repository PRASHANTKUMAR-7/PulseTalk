import User from "../models/user.js";
import jwt from "jsonwebtoken";

export async function signup(req,res){
    const{email,password,fullName}=req.body;
    try{
        if(!email ||!password || !fullName){
            return res.status(400).json({message: "All fields are required"});
        }
        if(password.length<6){
            return res.status(400).json({message: "Password must be atleast 6 characters"});
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }
        const exitingUser= await User.findOne({email});
        if(exitingUser){
            return res.status(400).json({message: "Email already existed, please use another email1"});
        }
        const idx= Math.floor(Math.random()*100)+1;
        const randomAvatar=`https://avatar.iran.liara.run/public/${idx}.png`;
        const newUser = await User.create({
            email,
            fullName,
            password,
            profilePic: randomAvatar,
        });

        //token is genrated for authenticationusing jwt 
        const token =jwt.sign({ userId:newUser._id},process.env.JWT_SECRET_KEY,{
            expiresIn:"7d"
        });

        res.cookie("jwt",token,{
            maxAge: 7*24*60*60*1000,
            httpOnly: true, //prevent XSS attacks,
            sameSite:"strict", //prevent from ccrc attack
            secure:process.env.NODE_ENV === 'production',
        });

        res.status(201).json({success:true,user:newUser}); 

    }
    catch(error){
        console.log("Error in signup controller",error);
        res.status(500).json({ message: "Internal Server Error"});
    }
};
 //login route 
export async function login(req,res){
    try{
        const {email,password} = req.body;
        if(!email || !password){
            return res.status(400).json({message:"All feilds are required"});
        }
        const user= await User.findOne({email});
        if(!user) return res.status(401).json({message:"Invailid email or password"});        
        const isPasswordCorrect=await user.matchPassword(password);

        //token is genrated for authenticationusing jwt 
        const token =jwt.sign({ userId:newUser._id},process.env.JWT_SECRET_KEY,{
            expiresIn:"7d"
        });

        res.cookie("jwt",token,{
            maxAge: 7*24*60*60*1000,
            httpOnly: true, //prevent XSS attacks,
            sameSite:"strict", //prevent from ccrc attack
            secure:process.env.NODE_ENV === 'production',
        });    if(!isPasswordCorrect) return res.status(401).json({message:"Invalid email or password"});
        res.status(200).json({success: true, user});
    
    }
    catch(error){
        console.log("Error in login controller",error);
        res.status(500).json({ message: "Internal Server Error"});
    }
};

export async function logout(req,res){
    res.send("Logout Route");
};