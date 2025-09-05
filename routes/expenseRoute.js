import express from 'express'
import {
  addExpense,
  getAllExpenses,
  downloadExpenseExcel,
  deleteExpense,
} from "../controller/expenseController.js";
import   protect  from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/add", protect, addExpense);
router.get("/get", protect, getAllExpenses);
router.get("/download", protect, downloadExpenseExcel);
router.delete("/:id", protect, deleteExpense);

export default router;
