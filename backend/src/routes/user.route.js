import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {getMyFriends ,getRecommendedUsers} from "../controller/user.controller.js";

const router=express.Router();

//apply auth middleware to all route
router.use(protectRoute);
router.get("/",getRecommendedUsers);
router.get("/friends",getMyFriends);

export default router;