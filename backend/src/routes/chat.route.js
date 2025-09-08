import express from "express";
import { protectedRoute } from "../middleware/auth.middleware.js";
import { getStreamToken } from "../controller/chat.controller.js";
 const router = express.Router();
 //route for authenticate user on stream(app)
 router.get("/token", protectedRoute,getStreamToken); //we have to create a strem token for either msg or video call


 export default router;