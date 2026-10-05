import { generateJWTToken } from "../utils/generateToken.js";
import { getFrontendUrl, setAuthCookie } from "../utils/authCookie.js";

export const googleAuthCallback = (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.redirect(`${getFrontendUrl()}/login?error=oauth_failed`);
    }
    const token = generateJWTToken(user._id);
    setAuthCookie(res, token);
    if (!user.isOnboarded) {
      return res.redirect(`${getFrontendUrl()}/onboarding`);
    }
    return res.redirect(`${getFrontendUrl()}/`);
  } catch (error) {
    console.error("Error in Google OAuth callback:", error);
    return res.redirect(`${getFrontendUrl()}/login?error=oauth_error`);
  }
};