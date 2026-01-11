const express = require("express");
const logoutRouter = express.Router();

logoutRouter.get("/auth/logout", async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: 'none'
  });
  res.end();
});

module.exports = { logoutRouter };
