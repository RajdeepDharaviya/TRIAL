const zod = require("zod");

const OrganizersignupSchema = zod.object({
  company_name: zod.string(),
  email: zod.string().email("Please enter valid email address"),
  password: zod.string().min(8, "Please enter atleast 8 digits "),
  contact: zod.number().min(10, "Please enter atleast 10 digits"),
});

const usersignupSchema = zod.object({
  firstname: zod.string(),
  lastname: zod.string(),
  email: zod.string().email(),
  password: zod.string().min(8),
  contact: zod.number().min(10),
  age: zod.number(),
  profession: zod.string(),
  isAct: zod.boolean(),
});

const signinSchema = zod.object({
  email: zod.string().email("Please Enter valid format for email"),
  password: zod.string().min(8, "Please enter atleast 8 digits"),
});

module.exports = { OrganizersignupSchema, usersignupSchema, signinSchema };
