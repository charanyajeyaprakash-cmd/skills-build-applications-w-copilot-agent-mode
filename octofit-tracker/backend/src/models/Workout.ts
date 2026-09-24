import mongoose, { Document, Schema } from 'mongoose';

interface Exercise {
  name: string;
  durationMinutes?: number;
  repetitions?: number;
}

export interface WorkoutDocument extends Document {
  title: string;
  description?: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  exercises: Exercise[];
  tags: string[];
}

const workoutSchema = new Schema<WorkoutDocument>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], default: 'beginner' },
    exercises: [
      {
        name: { type: String, required: true, trim: true },
        durationMinutes: { type: Number, min: 1 },
        repetitions: { type: Number, min: 1 },
      },
    ],
    tags: [{ type: String, trim: true }],
  },
  { timestamps: true },
);

export default mongoose.model<WorkoutDocument>('Workout', workoutSchema);