import express  from "express";
import dotenv from "dotenv";
import cors from "cors";
import { userRoute } from "./routes/userRoutes.js";
import { foodRoute } from "./routes/foodRoutes.js";
dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(cors());

app.listen(PORT, () => {
  console.log(`Server Is Running On Port : ${PORT}`);
});

app.use("/api/food", foodRoute);
app.use("/api/user", userRoute);
