const express = require("express");
const { middlewareOrg } = require("../../middlewares/middleware");
const { PrismaClient } = require("@prisma/client");
const elgRouter = express.Router();
const prisma = new PrismaClient();

elgRouter.use(middlewareOrg);

//Getting events from database
const fetchEvents = async () => {
  const events = await prisma.organizer.findMany({
    where: {
      id: req.userId,
    },
    include: {
      events: {
        where: {
          e_isAct: true,
        },
        include: {
          Eligiblities: {
            select: {
              id,
              e_profession,
            },
          },
        },
      },
    },
  });
};

// Route for getting tasks of events
/* ************** "http://localhost:3000/organization/eligiblities" ***************/
elgRouter.get("/", async (req, res) => {
  const events = fetchEvents();

  if (events) {
    res.status(responseCode.Success).json({
      message: "events given below",
      events: events.map((event) => {
        return event;
      }),
    });
  }
});

// Route for adding eligiblities into events
/* ************** "http://localhost:3000/organization/eligiblities/add" ***************/
elgRouter.post("/add", async (req, res) => {
  const body = req.body;

  const eventeligiblities = await prisma.eventManager.create({
    where: {
      id: body.event_id,
    },
    data: {
      Eligiblities: {
        create: {
          e_profession: body.e_profession,
        },
      },
    },
    include: {
      Eligiblities: true,
    },
  });

  if (eventeligiblities) {
    res.status(responseCode.Success).json({
      message: "Task added to event successfully!",
      eventeligiblities: eventeligiblities.map((eventTask) => {
        return eventTask;
      }),
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
  const eventTask = await prisma.eventManager.update({
    where: {
      id: body.event_id,
    },
    data: {
      eligiblities: {
        deleteMany: { id: body.eligiblity_id },
      },
    },
  });

  if (eventeligiblities) {
    res.status(responseCode.Success).json({
      message: "Schedule deleted successfully!",
      eventTask: eventTask,
    });
  } else {
    res
      .status(responseCode.InternalServerError)
      .send("Something wrong with server , Please try again after sometime!");
  }
});

module.exports = { elgRouter };
