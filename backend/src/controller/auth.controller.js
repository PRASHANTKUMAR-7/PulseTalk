import { upsertStreamUser } from "../lib/stream.js";
import User from "../models/user.js";
import jwt from "jsonwebtoken";


//sign up route
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

        //creating user on stream
        try {
            await upsertStreamUser({
                id:newUser._id.toString(),
                name:newUser.fullName,
                image:newUser.profilePic || "",
            });
            console.log(`Stream user created${newUser.fullName}`);
        } catch (error) {
            console.log("Error in creating user on stream", error);
        }




        //token is genrated for authenticationusing jwt 
        const token =jwt.sign({ userId:newUser._id},process.env.JWT_SECRET_KEY,{
            expiresIn:"7d"
        });

        res.cookie("jwt",token,{ // jwt is the a variable name for jwt cookie
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
        if(!user) return res.status(401).json({message:"Invailid email or password"});//check user present in DB     
        const isPasswordCorrect=await user.matchPassword(password); //check password is correct
        if(!isPasswordCorrect) return res.status(401).json({message:"Invalid email or password"});

        //token is genrated for authenticationusing jwt 
        const token =jwt.sign({ userId: user._id},process.env.JWT_SECRET_KEY,{
            expiresIn:"7d"
        });

        res.cookie("jwt",token,{ // jwt is the a variable name for jwt cookie
            maxAge: 7*24*60*60*1000,
            httpOnly: true, //prevent XSS attacks,
            sameSite:"strict", //prevent from ccrc attack
            secure:process.env.NODE_ENV === 'production',
        });    
        
        res.status(200).json({success: true, user});
    
    }
    catch(error){
        console.log("Error in login controller",error);
        res.status(500).json({ message: "Internal Server Error"});
    }
};

export async function logout(req,res){
    res.clearCookie("jwt");
    res.status(200).json({success:true,message: "Logout Succesful"});
};