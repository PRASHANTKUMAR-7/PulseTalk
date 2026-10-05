import passport from "../config/passport.js";
import { getFrontendUrl } from "../utils/authCookie.js";

export const googleAuth = passport.authenticate("google", {
  scope: ["profile", "email"],
});

export const googleAuthCallbackMiddleware = passport.authenticate("google", {
  session: false,
  failureRedirect: () => `${getFrontendUrl()}/login?error=oauth_failed`,
});
