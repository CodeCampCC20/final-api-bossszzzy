import { createError } from "../utils/createError.js";
import bcrypt from "bcryptjs";
import prisma from "../config/prisma.js";
import jwt from "jsonwebtoken";

export const authControllerUser = {
  register: async (req, res, next) => {
    try {
      const { username, password } = req.body;
      // console.log(req.body);
      const user = await prisma.user.findFirst({
        where: {
          username,
        },
      });
      // console.log('username', username)
      if (user) {
        createError(400, "username already exist!");
      }
      const hashPassword = bcrypt.hashSync(password, 10);
      // console.log('hashPassword', hashPassword)
      const result = await prisma.user.create({
        data: {
          username,
          password: hashPassword,
        },
      });
      res.status(201).json({ message: "Register user Successfully" });
    } catch (error) {
      next(error);
    }
  },
  login: async (req, res, next) => {
    try {
      const { username, password } = req.body;

      const user = await prisma.user.findFirst({
        where: {
          username,
        },
      });
      if (!user) {
        createError(400, "Email or password is invalid");
      }

      const checkPassword = bcrypt.compareSync(password, user.password);

      if (!checkPassword) {
        createError(400, "Email or password is invalid");
      }
      const payload = {
        id: user.id,
      };

      const token = jwt.sign(payload, process.env.SECRETUSER, {
        expiresIn: "1d",
      });
      res.json({ message: `Welcome ${user.username}`, payload, token });
    } catch (error) {
      next(error);
    }
  },
};

export const authControllerDoc = {
  register: async (req, res, next) => {
    try {
      const { username, password, specialization } = req.body;
      // console.log(req.body);
      const user = await prisma.doctor.findFirst({
        where: {
          username,
        },
      });
      // console.log('username', username)
      if (user) {
        createError(400, "username already exist!");
      }
      const hashPassword = bcrypt.hashSync(password, 10);
      // console.log('hashPassword', hashPassword)
      const result = await prisma.doctor.create({
        data: {
          username,
          password: hashPassword,
          specialization,
        },
      });
      res.status(201).json({ message: "Register user Successfully" });
    } catch (error) {
      next(error);
    }
  },
  login: async (req, res, next) => {
    try {
      const { username, password } = req.body;
      const user = await prisma.doctor.findFirst({
        where: {
          username,
        },
      });
      if (!user) {
        createError(400, "Email or password is invalid");
      }

      const checkPassword = bcrypt.compareSync(password, user.password);

      if (!checkPassword) {
        createError(400, "Email or password is invalid");
      }
      const payload = {
        id: user.id,
      };

      const token = jwt.sign(payload, process.env.SECRETDOCTOR, {
        expiresIn: "1d",
      });
      res.json({ message: `Welcome ${user.username}`, payload, token });
    } catch (error) {
      next(error);
    }
  },
};
