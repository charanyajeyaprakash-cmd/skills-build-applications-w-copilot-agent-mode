import 'dotenv/config';
import { connectDatabase, disconnectDatabase } from '../config/database';
import Activity from '../models/Activity';
import Leaderboard from '../models/Leaderboard';
import Team from '../models/Team';
import User from '../models/User';
import Workout from '../models/Workout';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await connectDatabase();

    await Promise.all([
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Team.deleteMany({}),
      User.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.insertMany([
      { username: 'alex', email: 'alex@example.com', points: 420 },
      { username: 'jordan', email: 'jordan@example.com', points: 350 },
      { username: 'casey', email: 'casey@example.com', points: 275 },
    ]);

    await Team.insertMany([
      { name: 'Trail Blazers', memberIds: [users[0]._id, users[1]._id], points: 770 },
      { name: 'Core Crushers', memberIds: [users[2]._id], points: 275 },
    ]);

    await Activity.insertMany([
      {
        userId: users[0]._id,
        type: 'running',
        durationMinutes: 35,
        distanceKm: 5.2,
        points: 180,
        completedAt: new Date('2026-09-20T07:30:00Z'),
      },
      {
        userId: users[0]._id,
        type: 'strength',
        durationMinutes: 45,
        points: 240,
        completedAt: new Date('2026-09-22T17:00:00Z'),
      },
      {
        userId: users[1]._id,
        type: 'walking',
        durationMinutes: 50,
        distanceKm: 4.1,
        points: 160,
        completedAt: new Date('2026-09-21T12:15:00Z'),
      },
      {
        userId: users[2]._id,
        type: 'strength',
        durationMinutes: 30,
        points: 140,
        completedAt: new Date('2026-09-23T18:30:00Z'),
      },
    ]);

    await Leaderboard.insertMany([
      { userId: users[0]._id, points: 420, rank: 1, period: 'monthly' },
      { userId: users[1]._id, points: 350, rank: 2, period: 'monthly' },
      { userId: users[2]._id, points: 275, rank: 3, period: 'monthly' },
    ]);

    await Workout.insertMany([
      {
        title: 'Morning 5K Builder',
        description: 'A steady running session for building endurance.',
        difficulty: 'beginner',
        exercises: [
          { name: 'Warm-up walk', durationMinutes: 5 },
          { name: 'Easy run', durationMinutes: 25 },
          { name: 'Cool-down walk', durationMinutes: 5 },
        ],
        tags: ['running', 'endurance'],
      },
      {
        title: 'Full Body Strength',
        description: 'A balanced strength circuit for the whole body.',
        difficulty: 'intermediate',
        exercises: [
          { name: 'Squats', repetitions: 12 },
          { name: 'Push-ups', repetitions: 10 },
          { name: 'Plank', durationMinutes: 1 },
        ],
        tags: ['strength', 'full-body'],
      },
      {
        title: 'Active Recovery Walk',
        description: 'A relaxed walk to keep moving on recovery days.',
        difficulty: 'beginner',
        exercises: [{ name: 'Brisk walk', durationMinutes: 30 }],
        tags: ['walking', 'recovery'],
      },
    ]);

    console.log('Database seeding complete');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  } finally {
    await disconnectDatabase();
  }
}

seedDatabase();
