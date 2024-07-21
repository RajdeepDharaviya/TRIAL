const { PrismaClient } = require("@prisma/client");
const express = require("express");
const { middleware } = require("../../middlewares/middleware");
const { responseCode } = require("../../config");
const prfRouter = express.Router();
const prisma = new PrismaClient();
prfRouter.use(middleware);

// Fetching user data from database
const userData = async (id) => {
  const user = await prisma.user.findFirst({
    where: {
      id: id,
    },
    select: {
      email,
      contact,
      age,
      firstname,
      lastname,
      password,
      profession,
    },
  });

  return user;
};

prfRouter.get("/", async (req, res) => {
  const user = userData(req.userId);

  res.status(responseCode.Success).json({
    message: "Your profile",
    user: user,
  });
});

prfRouter.put("/update", async (req, res) => {
  const body = req.body;

  const userUpdate = await prisma.user.update({
    where: {
      id: req.userId,
    },
    data: {
      age: body.age,
      profession: body.profession,
      password: body.password,
      firstname: body.firstname,
      lastname: body.lastname,
      contact: body.contact,
      email: body.email,
    },
  });

  if (userUpdate) {
    res.status(responseCode.Success).json({
      message: "Your profile was updated successfully!",
      user: user,
    });
  } else {
    res
      .status(responseCode.InternalServerError)
      .send("Something wrong with server, Please try again after sometime!");
  }
});

module.exports = { prfRouter };
