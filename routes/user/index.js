const express = require("express");
const { eveRouter } = require("./events");
const { signinRoute } = require("./signin");
const { signupRoute } = require("./signup");
const { fbRouter } = require("./Feedback");
const { joinRouter } = require("./joinEvent");
const { prfRouter } = require("./profile");
const userRouter = express.Router();

userRouter.use("/signin", signinRoute);
userRouter.use("/signup", signupRoute);
userRouter.use("/events", eveRouter);
userRouter.use("/feedback", fbRouter);
userRouter.use("/join", joinRouter);
userRouter.use("/profile", prfRouter);

module.exports = { userRouter };
