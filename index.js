import express from "express";
import  dotenv from "dotenv";
import  connectDB from "./config/db.js";
import  incomeRoutes  from "./routes/incomeRoutes.js";
import  authRoutes   from "./routes/authRoutes.js";
import   protect   from  "./middleware/authMiddleware.js";
import expenseRoutes  from "./routes/expenseRoute.js";
import dashboardRoutes  from "./routes/dashboardRoutes.js";
import cors from "cors";

dotenv.config();

connectDB();

const app = express();
app.use(express.json());

// enable CORS for frontend
app.use(cors({
  origin: "http://localhost:3000", // React frontend URL
  credentials: true
}));

// Public routes
app.use("/api/v1/auth", authRoutes);

// Protected routes
app.use("/api/v1/income", protect, incomeRoutes);
app.use("/api/v1/expense", protect, expenseRoutes);
app.use("/api/v1/dashboard", protect, dashboardRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
