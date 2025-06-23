import prisma from "../config/prisma.js";

export const userController = {
  getMe: async (req, res, next) => {
    try {
      const { id } = req.user;
      const user = await prisma.user.findFirst({
        where: {
          id: Number(id),
        },
        omit: {
          password: true,
        },
      });
      res.json({ result: user });
    } catch (error) {
      next(error);
    }
  },
  update: async (req, res, next) => {
    try {
      const { id } = req.user;
      const { username } = req.body;
      const user = await prisma.user.update({
        where: {
          id: Number(id),
        },
        data: {
          username: username,
        },
      });
      res.json({ result: user.username });
    } catch (error) {
      next(error);
    }
  },
  healthRecord: async (req, res, next) => {
    try {
      const { type, value } = req.body;
      const result = await prisma.healthRecord.create({
        data: {
          type,
          value,
          userId: req.user.id,
        },
      });
      res
        .status(201)
        .json({ message: "create health record successfully", result });
    } catch (error) {
      next(error);
    }
  },
};
