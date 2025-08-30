import User from "../models/user.js";
import FriendRequest from "../models/FriendRequest.js";

//route for recomending user
export async function getRecommendedUsers(req,res){
    try {
        const currentUserId=req.user.id;
        const currentUser=req.user;
        const recommendedUsers=await User.find({
            $and:[
                {_id:{$ne: currentUserId}}, //exclude current user
                {$id:{$min: currentUser.friends}},//exclude user which are already friends
                {isOnboarded:true}
            ]
        })
        res.status(200).json({recommendedUsers});

    } catch (error) {
        console.error("Error in getRecommendedUsers controller",error.message);
        res.status(500).json({message: "Internet server Error"});
    }

};

export async function getMyFriends(req,res){
    try {
        const user=await User.findById(req.user.id)
        .selext("friends")
        .populate("friends","fullName profilePic nativeLanguage learningLanguage");

        res.status(200).json(user.friends);

    } catch (error) {
        console.error("Error in getMyfriends ontroller",error.message);
        res.status(500).json({message: "Internet server Error"});
    }

};

//route to send friends request 
export async function sendFriendRequest(req,res){
    try {
        const myId=req.user.id;
        const {id:recipientId}=req.param;

        //prevent sending req to yourself
        if(myId===recipientId){
            return res.status(400).json({message: "You can't send friend request to yourself"});
        }
        const recipient= await User.findById(recipientId);
        if(!recipient){
            res.status(404).json({message: "Recipient not found"});
        }
//check user is already friend of current user or not 
        if(recipient.friends.includes(myId)){
            return res.status(400).json({message: "You are already friend with user"});
        }

//check is a friend request is already exits
        const exitingRequest=await FriendRequest.findOne({
            $or:[
                {sender:myId,recipient:recipientId},
                {sender: recipientId,recipient:myId},
            ],
        });
        if(exitingRequest){
            return res.status(400).json({message: "A friend request already exit"});
        }
        const friendRequest= await FriendRequest.create({
            sender:myId,
            recipient:recipientId,
        });
        res.status(201).json(friendRequest);

    } catch (error) {
        res.status(500).json({message: "Internet server Error"});
    }

}