import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {acceptFriendRequest, getFriendRequest, 
getMyFriends ,getOutgoingFriendReqs,
getRecommendedUsers,sendFriendRequest} from "../controller/user.controller.js";

const router=express.Router();

//apply auth middleware to all route
router.use(protectRoute);

router.get("/",getRecommendedUsers);
router.get("/friends",getMyFriends);

//route for sending friend request
router.post("/friend-request/:id", sendFriendRequest);
//route for accepting a freind request
router.put("/friend-request/:id/accept",acceptFriendRequest);

//future scope
//reject friend request route

// friend request we get and its status
router.get("/friend-request/",getFriendRequest);

//route to avoid the user whome the present user send friend request
router.get("/outgoing-friend-request", getOutgoingFriendReqs)

export default router;