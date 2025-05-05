import { test, expect } from '@playwright/test';
import { mockLeaderboardData } from './mocks/leaderboardData';

declare global {
  interface Window {
    setActiveMoles: (indices: number[]) => void;
  }
}

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    window.setActiveMoles = (indices: number[]) => {
      const gameBoard = document.querySelector('[data-testid="game-board"]');
      if (gameBoard) {
        indices.forEach((index: number) => {
          const mole = document.querySelector(`[data-testid="mole-hole"]:nth-child(${index + 1})`);
          if (mole) {
            mole.setAttribute('data-active', 'true');
          }
        });
      }
    };
  });

  await page.route('**/api/leaderboard', async (route) => {
    await route.fulfill({
      status: 200,
      body: JSON.stringify(mockLeaderboardData),
    });
  });
});

test.describe('Game Page', () => {
  test('should redirect to home if no name is present', async ({ page }) => {
    await page.addInitScript(() => {
      window.localStorage.clear();
    });
    
    await page.goto('/game-page');
    await expect(page).toHaveURL('/');
  });

  test('should render game page with correct initial state', async ({ page }) => {
    await page.goto('/');
    await page.getByPlaceholder('Enter your name').fill('TestPlayer');
    await page.getByRole('button', { name: 'Submit' }).click();
    
    await expect(page).toHaveURL('/game-page');
    await page.waitForLoadState('networkidle');
    
    await expect(page.getByText("Let's Play, TestPlayer!")).toBeVisible();
    
    const startButton = page.getByRole('button', { name: 'Start Game' });
    await expect(startButton).toBeEnabled();
    
    await expect(page.getByText('Time: 70s')).toBeVisible();
    
    await expect(page.getByText('Score: 0')).toBeVisible();
  });

  test('should start game when clicking start button', async ({ page }) => {
    await page.goto('/');
    await page.getByPlaceholder('Enter your name').fill('TestPlayer');
    await page.getByRole('button', { name: 'Submit' }).click();
    
    await expect(page).toHaveURL('/game-page');
    await page.waitForLoadState('networkidle');
    
    const startButton = page.getByTestId('game-button');
    await expect(startButton).toBeVisible();
    await expect(startButton).toBeEnabled();
    await expect(startButton).toHaveText('Start Game');
    
    await startButton.click();
    
    await expect(startButton).toBeDisabled();
    await expect(startButton).toHaveText('Running...');
    
    await expect(page.getByTestId('timer')).toHaveText('Time: 69s');
  });

  test('should open leaderboard modal when game ends', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  
    await page.getByPlaceholder('Enter your name').fill('TestPlayer');
    await page.getByRole('button', { name: 'Submit' }).click();
    
    await Promise.all([
      page.waitForURL('/game-page'),
      page.waitForSelector('[data-testid="game-board"]'),
      page.waitForSelector('[data-testid="game-button"]')
    ]);
    
    await page.evaluate(() => {
      window.localStorage.setItem('testMode', 'true');
    });
    
    const startButton = page.getByRole('button', { name: 'Start Game' });
    await startButton.click();
    
    await page.waitForTimeout(5500);
    
    await page.waitForLoadState('networkidle');
    
    await expect(page.getByText('Leaderboard')).toBeVisible();
  });

  test('should open leaderboard when clicking leaderboard button', async ({ page }) => {
    await page.goto('/');
    await page.getByPlaceholder('Enter your name').fill('TestPlayer');
    await page.getByRole('button', { name: 'Submit' }).click();
    
    await expect(page).toHaveURL('/game-page');
    
    const leaderboardButton = page.getByTestId('leaderboard-button');
    await leaderboardButton.click();
    
    await expect(page.getByText('Leaderboard')).toBeVisible();
  });
}); 