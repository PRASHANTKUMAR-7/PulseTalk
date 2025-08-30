import User from "../models/User.js";

export async function signup(req,res){
    const{email,password,fullname}=req.body;
    try{
        if(!email ||!password || !fullname){
            return res.status(400).jason({message: "All fields are required"});
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
        const newUser = new User.create({
            email,
            fullname,
            password,
            profilePic: randomAvatar,
        });
        const token =jwt.sign({ userId:newUser._id},process.env.JWT_SECRET_KEY,{
            expiresIn:"7d"
        });

    }
    catch(error){

    }
};

export async function login(req,res){
    res.send("Login Route");
};

export async function logout(req,res){
    res.send("Logout Route");
};