const express = require("express");
const { middlewareOrg } = require("../../middlewares/middleware");
const { PrismaClient } = require("@prisma/client");
const { responseCode } = require("../../config");
const budRouter = express.Router();
const prisma = new PrismaClient();

budRouter.use(middlewareOrg);

//Getting events from database
const fetchEvents = async (id) => {
  const events = await prisma.organizer.findMany({
    where: {
      id: id,
    },
    include: {
      events: {
        where: {
          e_isAct: true,
        },
        include: {
          Budgets: true,
        },
      },
    },
  });
  return events;
};

// Route for getting tasks of events
/* ************** "http://localhost:3000/organization/budget" ***************/
budRouter.get("/", async (req, res) => {
  const events = await fetchEvents(req.userId);

  if (events != null) {
    res.status(responseCode.Success).json({
      message: "events given below",
      events: events.map((event) => {
        return event;
      }),
    });
  } else {
    res
      .status(responseCode.InternalServerError)
      .send("Please try again,After sometime !");
  }
});

// Route for adding eligiblities into events
/* ************** "http://localhost:3000/organization/budget/add" ***************/
budRouter.post("/add", async (req, res) => {
  const body = req.body;

  const budget = await prisma.budget.create({
    data: {
      event_id: body.event_id,
      total_budget: body.total_budget,
    },
  });

  if (budget != null) {
    res.send("done!");
  } else {
    res
      .status(responseCode.InternalServerError)
      .send("Something wrong with server , Please try again after sometime!");
  }
});

// Route for updating eligiblities into events
/* ************** "http://localhost:3000/organization/budget/update" ***************/
budRouter.put("/update", async (req, res) => {
  const body = req.body;

  const eventTask = await prisma.budget.update({
    where: {
      event_id: body.event_id,
      id: body.budget_id,
    },
    data: {
      total_budget: body.total_budget,
    },
  });

  if (eventTask != null) {
    res.status(responseCode.Success).json({
      message: "Schedule updated successfully!",
      eventTask: eventTask,
    });
  } else {
    res
      .status(responseCode.InternalServerError)
      .send("Something wrong with server , Please try again after sometime!");
  }
});

module.exports = { budRouter };
