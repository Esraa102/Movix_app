import express from "express";
import { ENV_VARS } from "./config/env_Vars.js";
import { connectToDB } from "./config/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import authRoutes from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";
import movieRouter from "./routes/movie.route.js";
import TVRouter from "./routes/tv.route.js";
import searchRouter from "./routes/search.route.js";

const app = express();
const port = ENV_VARS.PORT;
const __dirname = path.resolve();
app.use(express.json()); //parsing req.body
app.use(cookieParser()); // parsing req.cookies
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["POST", "GET", "DELETE"],
    credentials: true,
  })
);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/movie", movieRouter);
app.use("/api/v1/tv", TVRouter);
app.use("/api/v1/search", searchRouter);

if (ENV_VARS.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}
app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
  connectToDB();
});
