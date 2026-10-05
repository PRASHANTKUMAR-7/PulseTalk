import express from "express";
import { googleAuth, googleAuthCallbackMiddleware } from "../middleware/oauth.middleware.js";
import { googleAuthCallback } from "../controller/oauth.controller.js";

const router = express.Router();

router.get("/google", googleAuth);
router.get("/google/callback", googleAuthCallbackMiddleware, googleAuthCallback);

export default router;
