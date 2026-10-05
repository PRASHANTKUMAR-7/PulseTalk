export const getFrontendUrl = () =>
  process.env.FRONTEND_URL || "http://localhost:5173";

export const authCookieOptions = () => ({
  httpOnly: true,
  sameSite: "lax",
  secure: process.env.NODE_ENV === "production",
  path: "/",
});

export const setAuthCookie = (res, token) => {
  res.cookie("jwt", token, {
    ...authCookieOptions(),
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};

export const clearAuthCookie = (res) => {
  res.clearCookie("jwt", authCookieOptions());
};