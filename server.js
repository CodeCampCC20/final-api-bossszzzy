import express from "express";
import authRouter from "./routes/auth.route.js";
import error from "./utils/error.js";
import notFound from "./utils/notFound.js";
import userRouter from "./routes/user.router.js";
import docRouter from "./routes/doc.router.js";

const PORT = 8888;

const app = express();

app.use(express.json());

app.use("/auth", authRouter);
app.use("/", userRouter);
app.use("/", docRouter);

app.use(error);

app.use(notFound);

app.listen(PORT, () => {
  console.log(`server running at http://localhost:${PORT}`);
});
