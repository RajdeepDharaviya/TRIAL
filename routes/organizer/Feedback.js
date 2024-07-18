const express = require("express");
const { middlewareOrg } = require("../../middlewares/middleware");
const fbRouter = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

fbRouter.use(middlewareOrg);

// Route for getting feedback
/* ************** "http://localhost:3000/user/feedback/" ***************/
fbRouter.get("/", async (req, res) => {
  const feedbacks = await prisma.feedback.findMany({
    where: {
      user_id: req.userId,
    },
  });
  if (feedback != []) {
    res.status(responseCode.Success).json({
      message: "Feedbacks",
      feedback: feedbacks.map((feedback) => {
        return feedback;
      }),
    });
  } else {
    res
      .status(responseCode.InternalServerError)
      .send("Something wrong with server , Please try again after sometime!");
  }
});
module.exports = { fbRouter };
