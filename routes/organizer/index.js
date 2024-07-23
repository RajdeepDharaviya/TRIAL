const express = require("express");
const { schRouter } = require("./schedule");
const { attRouter } = require("./attendee");
const { eveRouter } = require("./events");
const { fbRouter } = require("./Feedback");
const { signinRoute } = require("./signin");
const { signupRoute } = require("./signup");
const { taskRouter } = require("./tasks");
const { venRouter } = require("./venues");
const { elgRouter } = require("./eligiblities");
const { budRouter } = require("./budget");
const orgRouter = express.Router();

orgRouter.use("/signin", signinRoute);
orgRouter.use("/signup", signupRoute);
orgRouter.use("/attendee", attRouter);
orgRouter.use("/events", eveRouter);
orgRouter.use("/feedback", fbRouter);
orgRouter.use("/schedule", schRouter);
orgRouter.use("/tasks", taskRouter);
orgRouter.use("/venues", venRouter);
orgRouter.use("/eligiblities", elgRouter);
orgRouter.use("/budget", budRouter);

module.exports = { orgRouter };
