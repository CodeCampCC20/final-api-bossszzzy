import prisma from "../config/prisma.js";

export const docController = {
  getMe: async (req, res, next) => {
    try {
      const { id } = req.user;
      const user = await prisma.doctor.findFirst({
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
      const { username, specialization } = req.body;
      const user = await prisma.doctor.update({
        where: {
          id: Number(id),
        },
        data: {
          username: username,
          specialization: specialization,
        },
      });
      res.json({
        result: { user: user.username, specialization: user.specialization },
      });
    } catch (error) {
      next(error);
    }
  },
};
