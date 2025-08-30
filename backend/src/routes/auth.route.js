import express from "express";
import { login, logout, onboard, signup } from "../controller/auth.controller.js";
import { protectedRoute } from "../middleware/auth.middleware.js";

const router= express.Router();

router.post("/signup",signup);
router.post("/login",login);
router.post("/Logout",logout);

router.post("/onboarding",protectedRoute,onboard);

//check is user is logged in or not
router.get("/me",protectedRoute,(req,res)=>{
    res.status(200).json({success:true,user:req.user});
});


export default router;
