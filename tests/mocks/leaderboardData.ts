import { LeaderboardEntry } from '../../src/app/types/leaderboard';

export const mockLeaderboardData: LeaderboardEntry[] = [
  {
    id: '1',
    name: 'Player 1',
    score: 100,
    timestamp: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Player 2',
    score: 85,
    timestamp: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Player 3',
    score: 70,
    timestamp: new Date().toISOString(),
  },
]; 