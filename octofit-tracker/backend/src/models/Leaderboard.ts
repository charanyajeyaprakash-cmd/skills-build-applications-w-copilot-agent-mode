import mongoose, { Document, Schema } from 'mongoose';

export interface LeaderboardDocument extends Document {
  userId: mongoose.Types.ObjectId;
  points: number;
  rank?: number;
  period: string;
}

const leaderboardSchema = new Schema<LeaderboardDocument>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    points: { type: Number, default: 0, min: 0 },
    rank: { type: Number, min: 1 },
    period: { type: String, default: 'monthly', trim: true },
  },
  { timestamps: true },
);

leaderboardSchema.index({ period: 1, points: -1 });

export default mongoose.model<LeaderboardDocument>('Leaderboard', leaderboardSchema);