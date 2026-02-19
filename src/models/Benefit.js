import mongoose from 'mongoose';

const benefitSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    amount: { type: Number, default: null },
    coverageText: { type: String, default: null },
    requirements: [{ type: String, trim: true }],
    deadline: { type: Date, default: null },
    stockOrQuota: { type: Number, required: true, min: 0, default: 100 },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export const BenefitModel = mongoose.model('Benefit', benefitSchema);
