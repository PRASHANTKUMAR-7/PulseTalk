import express from "express";
import { login, logout, onboard, signup } from "../controller/auth.controller.js";
import { protectedRoute } from "../middleware/auth.middleware.js";

const router= express.Router();

router.post("/signup",signup);
router.post("/login",login);
router.post("/Logout",logout);

router.post("/onboarding",protectedRoute,onboard);

export default router;
