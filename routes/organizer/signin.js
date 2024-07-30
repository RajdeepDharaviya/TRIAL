const express = require("express");
const signinRoute = express.Router();
const { responseCode } = require("../../config");
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../../config");
const md5 = require("md5");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { signinSchema } = require("../../middlewares/validation");

// Route for Signin is
/* ************** "http://localhost:3000/organization/signin" ***************/
signinRoute.post("/", async (req, res) => {
  // Getting data from the Organizer
  const body = req.body;

  if (signinSchema.safeParse(body).success) {
    // Inserting data into the database
    const Organizer = await prisma.organizer.findUnique({
      where: {
        email: body.email,
        password: md5(body.password),
      },
    });

    // give response to the Organizer
    if (Organizer != null) {
      const token = jwt.sign(
        {
          email: Organizer.email,
          id: Organizer.id,
        },
        jwtSecret
      );
      res.status(responseCode.Success).json({
        message: "Sign in successfully!",
        token: "Bearer " + token,
      });
    } else {
      res.status(responseCode.InternalServerError).send("wrong credentials!");
    }
  } else {
    res.status(responseCode.NotValid).send(signinSchema.safeParse(body).error);
  }
});

module.exports = { signinRoute };
