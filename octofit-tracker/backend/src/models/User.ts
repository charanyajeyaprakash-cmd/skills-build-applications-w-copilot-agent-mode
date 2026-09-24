import mongoose, { Document, Schema } from 'mongoose';

export interface UserDocument extends Document {
  username: string;
  email: string;
  points: number;
}

const userSchema = new Schema<UserDocument>(
  {
    username: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    points: { type: Number, default: 0, min: 0 },
  },
  { timestamps: true },
);

export default mongoose.model<UserDocument>('User', userSchema);