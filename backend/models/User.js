import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    fullName:{
        type:String,
        required: true,
    },
    email:{
        type:String,
        required: true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        minlength:6,
    },
    bio:{
        type:String,
        default:"",
    },
    profilePic:{
        type:String,
        default:"",
    },
    nativeLanguage:{
        type:String,
        default:"",
    },
    learningLanguage:{
        type:String,
        default:"",
    },
    location:{
        type:String,
        default:"",
    },
    isOnboarded:{
        type:Boolean,
        default:false,
    },
    friends:[
        {
            type:mongoose.Schema.Types.ObjEctId,
            ref:"User",
        }
    ],
},{timestamps: true});//createdAt, updatedAt
//member since createdAt
  const User = mongoose.model("User",userSchema);
  export default User;

  34.00