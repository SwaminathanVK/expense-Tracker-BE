import express from 'express';
import { addIncome, getIncomes, updateIncome, deleteIncome, downloadIncomeExcel } from "../controller/incomeController.js";
import  protect  from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/add", protect, addIncome);
router.get("/get", protect, getIncomes);
router.put("/update/:id", protect, updateIncome);
router.delete("/delete/:id", protect, deleteIncome);
router.get("/download/excel", protect, downloadIncomeExcel);

export default router;
