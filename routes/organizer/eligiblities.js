const express = require("express");
const { middlewareOrg } = require("../../middlewares/middleware");
const { PrismaClient } = require("@prisma/client");
const { responseCode } = require("../../config");
const elgRouter = express.Router();
const prisma = new PrismaClient();

elgRouter.use(middlewareOrg);

//Getting events from database
const fetchEvents = async (id) => {
  const events = await prisma.organizer.findMany({
    where: {
      id: id,
    },
    select: {
      events: {
        where: {
          e_isAct: true,
        },
        include: {
          Eligiblities: true,
        },
      },
    },
  });
  console.log(events);
  return events;
};

// Route for getting tasks of events
/* ************** "http://localhost:3000/organization/eligiblities" ***************/
elgRouter.get("/", async (req, res) => {
  const events = fetchEvents(req.userId);

  if (events != []) {
    res.status(responseCode.Success).json({
      message: "events given below",
      events: (await events).map((event) => {
        return event;
      }),
    });
  } else {
    res
      .status(responseCode.InternalServerError)
      .send("Something wrong with server, Please try again after sometime!");
  }
});

// Route for adding eligiblities into events
/* ************** "http://localhost:3000/organization/eligiblities/add" ***************/
elgRouter.post("/add", async (req, res) => {
  const body = req.body;

  const eventeligiblities = await prisma.eligiblity.create({
    data: {
      event_id: body.event_id,
      e_profession: body.e_profession,
    },
  });

  if (eventeligiblities) {
    res.status(responseCode.Success).json({
      message: "Task added to event successfully!",
      eventeligiblities: eventeligiblities,
    });
  } else {
    res
      .status(responseCode.InternalServerError)
      .send("Something wrong with server , Please try again after sometime!");
  }
});

// Route for updating eligiblities into events
/* ************** "http://localhost:3000/organization/eligiblities/update" ***************/
elgRouter.put("/update", async (req, res) => {
  const body = req.body;

  const eventTask = await prisma.eventManager.update({
    where: {
      id: body.event_id,
    },
    data: {
      Eligiblities: {
        update: {
          where: {
            id: body.eligiblity_id,
          },
          data: {
            e_profession: body.e_profession,
          },
        },
      },
    },
  });

  if (eventTask) {
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

// Route for delete eligiblities into events
/* ************** "http://localhost:3000/organization/eligiblities/delete" ***************/
elgRouter.delete("/delete", async (req, res) => {
  const body = req.body;

  // you can delete multiple task at time
  const eligiblities = await prisma.eventManager.update({
    where: {
      id: body.event_id,
    },
    data: {
      Eligiblities: {
        deleteMany: { id: body.eligiblity_id },
      },
    },
  });

  if (eligiblities) {
    res.status(responseCode.Success).json({
      message: "Schedule deleted successfully!",
      eligiblities: eligiblities,
    });
  } else {
    res
      .status(responseCode.InternalServerError)
      .send("Something wrong with server , Please try again after sometime!");
  }
});

module.exports = { elgRouter };
