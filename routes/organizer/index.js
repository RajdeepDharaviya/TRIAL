const express = require("express");
const { schRouter } = require("./schedule");
const { attRouter } = require("./attendee");
const { eveRouter } = require("./events");
const { fbRouter } = require("./Feedback");
const { signinRoute } = require("./signin");
const { signupRoute } = require("./signup");
const { taskRouter } = require("./tasks");
const orgRouter = express.Router();

orgRouter.use("/signin", signinRoute);
orgRouter.use("/signup", signupRoute);
orgRouter.use("/attendee", attRouter);
orgRouter.use("/events", eveRouter);
orgRouter.use("/feedback", fbRouter);
orgRouter.use("/schedule", schRouter);
orgRouter.use("/tasks", taskRouter);

module.exports = { orgRouter };
