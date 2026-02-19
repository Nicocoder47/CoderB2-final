import mongoose from 'mongoose';

const ticketItemSchema = new mongoose.Schema(
  {
    benefit: { type: mongoose.Schema.Types.ObjectId, ref: 'Benefit', required: true },
    title: { type: String, required: true },
    quantity: { type: Number, required: true },
    unitAmount: { type: Number, default: null },
    subtotal: { type: Number, default: null }
  },
  { _id: false }
);

const notProcessedSchema = new mongoose.Schema(
  {
    benefit: { type: mongoose.Schema.Types.ObjectId, ref: 'Benefit', required: true },
    title: { type: String, required: true },
    reason: { type: String, required: true }
  },
  { _id: false }
);

const ticketSchema = new mongoose.Schema(
  {
    code: { type: String, required: true, unique: true },
    purchase_datetime: { type: Date, required: true, default: Date.now },
    amount: { type: Number, required: true, default: 0 },
    purchaser: { type: String, required: true, trim: true, lowercase: true },
    items: { type: [ticketItemSchema], default: [] },
    notProcessed: { type: [notProcessedSchema], default: [] },
    status: { type: String, enum: ['complete', 'partial'], default: 'complete' }
  },
  { timestamps: true }
);

export const TicketModel = mongoose.model('Ticket', ticketSchema);
