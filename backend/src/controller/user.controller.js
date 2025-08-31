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
        console.error("Error in sendFriendRequest Controller".error.message);
        res.status(500).json({message: "Internet server Error"});
    }

}

//route to check there is friend request or not and accept it
export async function acceptFriendRequest(req,res){
    try {
        const {id:requestId}=req.param;
        const friendRequest =await FriendRequest.findById(requestId);
        if(!friendRequest){
            return res.status(404).json({message:"Friends request not found"});    } 

        //verify current user is recipient
        if(friendRequest.recipient.toString()!==req.user.id){
            return res.status(403).json({message:"You are not authorised to accept this request"});
        }

        friendRequest.status="accepted";
        await friendRequest.save();

        //add both the user id in their friends list
        //$addToSet: adds element to an array only if they do not exit already.
        await User.findByIdAndUpdate(friendRequest.sender,{
            $addToSet:{ friends:friendRequest.recipient},
        });

        //add both the user id in their friends list
        //$addToSet: adds element to an array only if they do not exit already.
        await User.findByIdAndUpdate(friendRequest.sender,{
            $addToSet:{ friends:friendRequest.recipient},
        });
        res.status(200).json({message:"Friends request accepted"});

    } catch(error){
        console.log("Error in acceptFriendRequest controller",error.message);
        res.status(500).json({message:"Internal Server Error"});
    }

}

//route to get staus of friend request either came or accepted 
export async function getFriendRequest(req,res){
    try {
        const incommingReqs=await FriendRequest.find({
            recipient:req.user.id,
            status:"pending",
        }).populate("sender", "fullName profilePic nativeLanguage learningLanguage");

        const acceptedReqs=await FriendRequest.find({
            sender:req.user.id,
            status: "accepted",
        }).populate("recipient","fullName profilePic");

        res.status(200).json({incommingReqs,acceptedReqs});
    } catch (error) {
        console.log("Error in getPendingFriendRequest COntroller",error.message);
        req.status(500).json({message:"Internal Server Error"});
    }
}

//route to avoid the user whome the present user send friend request
export async function getOutgoingFriendReqs(req,res){
   try {
        const outgoingRequests=await FriendRequest.find({
            recipient:req.user.id,
            status:"pending",
        }).populate("resipient","fullName profilePic nativeLanguage learningLanguage");
   } catch (error) {
        console.log("Error in getOutgoingFriendRequest COntroller",error.message);
        req.status(500).json({message:"Internal Server Error"});
   } 
}