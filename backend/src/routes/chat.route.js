import express from "express";
import { protectedRoute } from "../middleware/auth.middleware";
import { getStreamToken } from "../controller/chat.controller.js";
 const router = express.Router();
 //route for authenticate user on stream(app)
 router.get("/token", protectedRoute,getStreamToken);


 export default router;