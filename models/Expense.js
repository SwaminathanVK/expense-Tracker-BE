import mongoose from 'mongoose'

const ExpenseSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    icon: { type: String },
    category: { type: String, required: true }, // Changed from 'source' to 'category'
    amount: { type: Number, required: true },       
    date: { type: Date, required: true },
}, { timestamps: true });

export default mongoose.model("Expense", ExpenseSchema);

