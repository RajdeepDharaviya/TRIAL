const express = require("express");
const { middlewareOrg } = require("../../middlewares/middleware");
const fbRouter = express.Router();
const { PrismaClient } = require("@prisma/client");
const { responseCode } = require("../../config");
const prisma = new PrismaClient();

fbRouter.use(middlewareOrg);

// Route for getting feedback
/* ************** "http://localhost:3000/organization/feedback/" ***************/
fbRouter.get("/", async (req, res) => {
  const feedbacks = await prisma.eventManager.findMany({
    where: {
      orgId: req.userId,
    },
    select: {
      e_name: true,
      feedbacks: {
        select: {
          suggestions: true,
          experience: true,
          rating: true,
        },
      },
    },
  });
  if (feedbacks != null) {
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
