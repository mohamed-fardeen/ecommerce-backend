const express = require("express");
const logoutRouter = express.Router();

logoutRouter.get("/auth/logout", async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? 'none' : 'lax'
  });
  res.end();
});

module.exports = { logoutRouter };
