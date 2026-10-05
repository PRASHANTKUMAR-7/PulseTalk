import passport, { isGoogleOAuthEnabled } from "../config/passport.js";
import { getFrontendUrl } from "../utils/authCookie.js";

const googleDisabledResponse = (req, res) => {
  // The button triggers a full page navigation, so redirect back to the UI
  // rather than returning raw JSON the user cannot read.
  return res.redirect(`${getFrontendUrl()}/login?error=oauth_disabled`);
};

export const googleAuth = (req, res, next) => {
  if (!isGoogleOAuthEnabled) return googleDisabledResponse(req, res);
  return passport.authenticate("google", {
    scope: ["profile", "email"],
  })(req, res, next);
};

export const googleAuthCallbackMiddleware = (req, res, next) => {
  if (!isGoogleOAuthEnabled) return googleDisabledResponse(req, res);
  return passport.authenticate("google", {
    session: false,
    failureRedirect: () => `${getFrontendUrl()}/login?error=oauth_failed`,
  })(req, res, next);
};