import mongoose, { Document, Schema } from 'mongoose';

export interface TeamDocument extends Document {
  name: string;
  memberIds: mongoose.Types.ObjectId[];
  points: number;
}

const teamSchema = new Schema<TeamDocument>(
  {
    name: { type: String, required: true, unique: true, trim: true },
    memberIds: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    points: { type: Number, default: 0, min: 0 },
  },
  { timestamps: true },
);

export default mongoose.model<TeamDocument>('Team', teamSchema);