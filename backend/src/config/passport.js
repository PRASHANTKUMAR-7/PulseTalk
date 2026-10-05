import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import "dotenv/config";
import User from "../models/user.js";
import { upsertStreamUser } from "../lib/stream.js";

const googleClientId = process.env.GOOGLE_CLIENT_ID?.trim();
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET?.trim();
const googleCallbackUrl = process.env.GOOGLE_CALLBACK_URL?.trim();

const isPlaceholder = (value) =>
  !value || value.toLowerCase().startsWith("your_");

const missingGoogleVars = [
  ["GOOGLE_CLIENT_ID", googleClientId],
  ["GOOGLE_CLIENT_SECRET", googleClientSecret],
  ["GOOGLE_CALLBACK_URL", googleCallbackUrl],
]
  .filter(([, value]) => isPlaceholder(value))
  .map(([name]) => name);

export const isGoogleOAuthEnabled = missingGoogleVars.length === 0;

if (isGoogleOAuthEnabled) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: googleClientId,
        clientSecret: googleClientSecret,
        callbackURL: googleCallbackUrl,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const email = profile.emails && profile.emails[0] && profile.emails[0].value;
          if (!email) {
            return done(new Error("No email found in Google profile"), null);
          }
          let user = await User.findOne({ email });
          if (!user) {
            user = await User.create({
              fullName: profile.displayName || "Google User",
              email,
              googleId: profile.id,
              profilePic: profile.photos && profile.photos[0] ? profile.photos[0].value : "",
              isOnboarded: false,
            });
            try {
              await upsertStreamUser({
                id: user._id.toString(),
                name: user.fullName,
                image: user.profilePic || "",
              });
            } catch (err) {
              console.log("Error upserting Stream user (Google):", err);
            }
          } else if (!user.googleId) {
            user.googleId = profile.id;
            await user.save();
          }
          return done(null, user);
        } catch (error) {
          return done(error, null);
        }
      }
    )
  );
  console.log("Google OAuth enabled");
} else {
  console.warn(
    `Google OAuth disabled - missing environment variables: ${missingGoogleVars.join(", ")}. ` +
      "Email/password authentication is unaffected."
  );
}

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id).select("-password");
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

export default passport;