const express = require("express");
const { middleware } = require("../../middlewares/middleware");
const { PrismaClient } = require("@prisma/client");
const { responseCode } = require("../../config");
const fbRouter = express.Router();
const prisma = new PrismaClient();

fbRouter.use(middleware);

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

// Route for Signin is
/* ************** "http://localhost:3000/user/feedback/write" ***************/
fbRouter.post("/write", async (req, res) => {
  const body = req.body;
  const feedback = await prisma.feedback.findMany({
    data: {
      suggestions: body.suggestions,
      experience: body.experience,
      rating: body.rating,
      even_id: body.even_id,
      user_id: req.userId,
    },
  });
  if (feedback != []) {
    res.status(responseCode.Success).json({
      message: "Your Feedback note successfully!",
      feedback: feedback,
    });
  } else {
    res
      .status(responseCode.InternalServerError)
      .send("Something wrong with server , Please try again after sometime!");
  }
});
module.exports = { fbRouter };
