import { LeaderboardEntry } from "../types/leaderboard";

export const saveScore = async (name: string, score: number): Promise<void> => {
  try {
    console.log('Attempting to save score:', { name, score });
    const response = await fetch('/api/scores', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, score }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Failed to save score:', data);
      throw new Error(data.error || 'Failed to save score');
    }

    console.log('Score saved successfully');
  } catch (error) {
    console.error('Error saving score:', error);
    throw error;
  }
};

export const fetchLeaderboardData = async (): Promise<LeaderboardEntry[]> => {
  try {
    const response = await fetch('/api/scores');
    if (!response.ok) {
      throw new Error('Failed to fetch leaderboard data');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch leaderboard data:', error);
    throw error;
  }
}; 