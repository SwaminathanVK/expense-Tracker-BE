import mongoose from 'mongoose';

const IncomeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",    // Reference User collection
    required: true
  },
  icon: {
    type: String,
    default: null
  },
  source: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    required: true
  }
}, { timestamps: true });

export default mongoose.model("Income", IncomeSchema);
