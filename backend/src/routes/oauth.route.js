import express from "express";
import { googleAuth, googleAuthCallbackMiddleware } from "../middleware/oauth.middleware.js";
import { googleAuthCallback } from "../controller/oauth.controller.js";
import { isGoogleOAuthEnabled } from "../config/passport.js";

const router = express.Router();

router.get("/oauth/status", (req, res) => {
  res.status(200).json({ googleOAuthEnabled: isGoogleOAuthEnabled });
});

router.get("/google", googleAuth);
router.get("/google/callback", googleAuthCallbackMiddleware, googleAuthCallback);

export default router;