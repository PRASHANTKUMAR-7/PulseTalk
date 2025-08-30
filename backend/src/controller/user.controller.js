import User from "../models/user.js";

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


};