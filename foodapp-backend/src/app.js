import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db";
import bodyParser from "body-parser";
import foodAppRouter from "./routes/foodAppRouter";
import authAppRouter from "./routes/authRouter";

dotenv.config();
const app = express();
app.use(cors());

connectDB();

app.get("/", (req, res) => {
  res.send("yo");
});
app.use(bodyParser.json());
app.use("/user", authAppRouter);
app.use("/foodapp", foodAppRouter);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`running on port ${PORT}`);
});

// process.on("uncaughtException", function (err) {
//   console.log("Caught exception: ", err);
// });
