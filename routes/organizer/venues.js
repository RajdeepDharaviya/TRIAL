const { PrismaClient } = require("@prisma/client");
const express = require("express");
const { middlewareOrg } = require("../../middlewares/middleware");
const venRouter = express.Router();
const { responseCode } = require("../../config");
const prisma = new PrismaClient();

venRouter.use(middlewareOrg);

//Getting events from database
const fetchEvents = async (id) => {
  const events = await prisma.organizer.findUnique({
    where: {
      id: id,
    },
    include: {
      events: {
        where: {
          e_isAct: true,
        },
        include: {
          Venues: true,
        },
      },
    },
  });

  return events;
};

// Route for getting venues of events
/* ************** "http://localhost:3000/organization/venues" ***************/
venRouter.get("/", async (req, res) => {
  const events = await fetchEvents(req.userId);

  if (events != []) {
    res.status(responseCode.Success).json({
      message: "events given below",
      events: events,
    });
  } else {
    res
      .status(responseCode.InternalServerError)
      .send("Something wrong with server , Please try again after sometime!");
  }
});

// Route for adding venues into events
/* ************** "http://localhost:3000/organization/venues/add" ***************/
venRouter.post("/add", async (req, res) => {
  const body = req.body;

  const eventvenues = await prisma.venue.create({
    data: {
      event_id: body.event_id,
      v_name: body.v_name,
      capacity: body.capacity,
    },
  });

  if (eventvenues != []) {
    res.status(responseCode.Success).json({
      message: "Events venues ",
      eventvenues: eventvenues,
    });
  } else {
    res
      .status(responseCode.InternalServerError)
      .send("Something wrong with server , Please try again after sometime!");
  }
});

// Route for updating venues into events
/* ************** "http://localhost:3000/organization/venues/update" ***************/
venRouter.put("/update", async (req, res) => {
  const body = req.body;

  const eventvenue = await prisma.venue.update({
    where: {
      event_id: body.event_id,
      id: body.venue_id,
    },
    data: {
      v_name: body.v_name,
      capacity: body.capacity,
    },
  });

  if (eventvenue != []) {
    res.status(responseCode.Success).json({
      message: "Venue updated successfully!",
      eventvenue: eventvenue,
    });
  } else {
    res
      .status(responseCode.InternalServerError)
      .send("Something wrong with server , Please try again after sometime!");
  }
});

// Route for delete venues into events
/* ************** "http://localhost:3000/organization/venues/delete" ***************/
venRouter.delete("/delete", async (req, res) => {
  const body = req.body;

  // you can delete multiple venue at time
  const eventvenue = await prisma.eventManager.update({
    where: {
      id: body.event_id,
    },
    data: {
      Venues: {
        deleteMany: { id: body.veneu_id },
      },
    },
  });

  if (eventvenue != []) {
    res.status(responseCode.Success).json({
      message: "Venue deleted successfully!",
      eventvenue: eventvenue,
    });
  } else {
    res
      .status(responseCode.InternalServerError)
      .send("Something wrong with server , Please try again after sometime!");
  }
});

module.exports = { venRouter };
