const express = require("express");
const { middleware } = require("../../middlewares/middleware");
const { PrismaClient } = require("@prisma/client");
const { responseCode } = require("../../config");
const joinRouter = express.Router();
const prisma = new PrismaClient();

joinRouter.use(middleware);

// Route for joining all events data
/* ************** "http://localhost:3000/user/join/event" ***************/
joinRouter.post("/event", async (req, res) => {
  const body = req.body;

  const join = await prisma.totalRegisters.create({
    data: {
      even_id: body.even_id,
      user_id: req.userId,
    },
  });
  if (join != []) {
    res.status(responseCode.Success).json({
      message: "You join this event successfully!",
    });
  } else {
    res
      .status(responseCode.InternalServerError)
      .send("Something wrong with server ,Please try again after sometime!");
  }
});

module.exports = { joinRouter };
