import dns from "dns";
dns.setDefaultResultOrder("ipv4first");

import express from "express";
import "dotenv/config";
import connectDB from "./database/db.js";
import userRoute from './routes/userRoute.js'
import cors from 'cors'
import productRoute from "./routes/productRoute.js"
import cartRoute from "./routes/cartRoute.js"
import paymentRoute from "./routes/paymentRoute.js"
import adminRoute from "./routes/adminRoute.js";

const app = express();
const PORT = process.env.PORT || 3000;
const BACKEND_URL = process.env.BACKEND_URL || `http://localhost:${PORT}`;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';
const ALLOWED_ORIGINS = [
  FRONTEND_URL,
  process.env.BACKEND_URL,
  'http://localhost:5173',
  'http://localhost:3000',
].filter(Boolean);

//middleware start
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin(origin, callback) {
    if (!origin || ALLOWED_ORIGINS.includes(origin)) {
      callback(null, true);
      return;
    }

    callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
}));

//middleware end


app.use('/api/v1/user', userRoute)
app.use('/api/v1/product',productRoute)
app.use('/api/v1/cart',cartRoute)
app.use('/api/v1/payment', paymentRoute)
app.use("/api/v1/admin",adminRoute);

// http://localhost:8000/api/v1/user/register





console.log("MONGO_URI =", process.env.MONGO_URI); // 👈 add this
console.log(`Backend URL: ${BACKEND_URL}`);

app.listen(PORT, () => {
    connectDB();
    console.log(`Server is listening at port :${PORT}`);
});
