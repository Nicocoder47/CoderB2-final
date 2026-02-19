import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    first_name: { type: String, required: true, trim: true },
    last_name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'user'], default: 'user' },
    cart: { type: mongoose.Schema.Types.ObjectId, ref: 'Cart', default: null },
    resetPasswordTokenHash: { type: String, default: null },
    resetPasswordTokenExp: { type: Date, default: null }
  },
  { timestamps: true }
);

export const UserModel = mongoose.model('User', userSchema);
