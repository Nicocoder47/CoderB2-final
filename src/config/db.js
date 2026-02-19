import mongoose from 'mongoose';

export const connectDB = async () => {
  const mongoURI = process.env.MONGO_URI;

  if (!mongoURI) {
    throw new Error('Falta variable de entorno MONGO_URI');
  }

  await mongoose.connect(mongoURI);
  console.log('MongoDB conectado');
};
