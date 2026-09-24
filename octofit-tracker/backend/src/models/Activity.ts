import mongoose, { Document, Schema } from 'mongoose';

export interface ActivityDocument extends Document {
  userId: mongoose.Types.ObjectId;
  type: 'running' | 'walking' | 'strength';
  durationMinutes: number;
  distanceKm?: number;
  points: number;
  completedAt: Date;
}

const activitySchema = new Schema<ActivityDocument>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, enum: ['running', 'walking', 'strength'], required: true },
    durationMinutes: { type: Number, required: true, min: 1 },
    distanceKm: { type: Number, min: 0 },
    points: { type: Number, default: 0, min: 0 },
    completedAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

export default mongoose.model<ActivityDocument>('Activity', activitySchema);