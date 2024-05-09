import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "../server/routes/auth.js";
import listingRoutes from '../server/routes/listing.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
/* ----- For using public folder ----- */
app.use(express.static("public"));

/* -----Routes----- */
app.use("/api/auth", authRoutes);
app.use('/api/properties', listingRoutes)

/* -----Mongoose Setup----- */
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
  })
  .catch((err) => console.log(`${err} Can not connect on Server`));
