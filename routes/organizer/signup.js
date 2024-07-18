const express = require("express");
const signupRoute = express.Router();
const { responseCode } = require("../../config");
const md5 = require("md5");
const { OrganizersignupSchema } = require("../../middlewares/validation");

// Route for Signup is
/* ************** "http://localhost:3000/organization/signup" ***************/
signupRoute.post("/", async (req, res) => {
  // Getting data from the Organizer
  const body = req.body;

  if (OrganizersignupSchema.safeParse(body).success) {
    // Inserting data into the database

    const Organizer = await prisma.Organizer.create({
      data: {
        company_name: body.company_name,
        email: body.email,
        password: md5(body.password),
        contact: body.contact,
        isAct: true,
      },
    });

    // give response to the Organizer
    if (Organizer) {
      res.status(responseCode.Success).json({
        message: "Your account has created successfully!",
      });
    } else {
      res
        .status(responseCode.InternalServerError)
        .send("Something wrong with server, please try again after sometime!");
    }
  } else {
    res.status(responseCode.NotValid).send("Please provid valid credetials!");
  }
});

module.exports = { signupRoute };
