import express from "express";
import createError from "http-errors";
import UserModel from "../models/users.js";
import { createAccessToken } from "../../auth/tools.js";
import { jwtAuthMiddleware } from "../../auth/Auth.js";
// import q2m from "query-to-mongo";

const usersRouter = express.Router();

// Get users

usersRouter.get("/allUsers", jwtAuthMiddleware, async (req, res, next) => {
  try {
    const currentUser = await UserModel.findById(req.user._id);
    const users = await UserModel.find({ _id: { $ne: currentUser._id } });
    res.send(users.map((user) => user.toJSON()));
  } catch (error) {
    next(error);
  }
});

// Login

usersRouter.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.checkCredentials(email, password);

    if (user) {
      const payload = { _id: user._id };
      const accessToken = await createAccessToken(payload);
      res.send({ user, accessToken });
    } else {
      next(createError(401, "Invalid email or password"));
    }
  } catch (error) {
    next(error);
  }
});

// Register

usersRouter.post("/register", async (req, res, next) => {
  try {
    const { username, password, email } = req.body;
    const existingUser = await UserModel.findOne({
      $or: [{ email }, { username }]
    });

    if (existingUser) {
      return res
        .status(400)
        .send({ error: "Email or username already in use" });
    }
    const newUser = new UserModel({
      username,
      password,
      email
    });
    const { _id } = await newUser.save();
    const payload = { _id: newUser._id };
    const accessToken = await createAccessToken(payload);
    res.status(201).send({ user: newUser, accessToken });
  } catch (error) {
    next(error);
  }
});

//Q2M

// usersRouter.get("/", jwtAuthMiddleware, async (req, res, next) => {
//   try {
//     const query = q2m(req.query);
//     const total = await UserModel.countDocuments(query.criteria);
//     const users = await UserModel.find(query.criteria, query.options.fields)
//       .skip(query.options.skip)
//       .limit(query.options.limit)
//       .sort(query.options.sort);
//     res.send({ links: query.links("/users", total), total, users });
//   } catch (error) {
//     next(error);
//   }
// });

export default usersRouter;
