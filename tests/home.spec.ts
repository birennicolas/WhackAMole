import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.waitForLoadState('domcontentloaded');
  });

  test('should display the title "Whack a Mole"', async ({ page }) => {
    
    const allText = await page.evaluate(() => document.body.textContent);
    console.log('All text on page:', allText);
    
    await page.waitForSelector('text="Whack a Mole"', { timeout: 10000 });
    
    const title = await page.locator('div').filter({
      hasText: /^Whack a Mole$/
    }).first();
    
    await expect(title).toBeVisible();
    
    const text = await title.textContent();
    expect(text?.trim()).toBe('Whack a Mole');
  });

  test('should have a name input field', async ({ page }) => {
    const input = await page.getByPlaceholder('Enter your name');
    await expect(input).toBeVisible();
    await expect(input).toBeEmpty();
  });

  test('should allow entering a name', async ({ page }) => {
    const input = await page.getByPlaceholder('Enter your name');
    await input.fill('TestPlayer');
    await expect(input).toHaveValue('TestPlayer');
  });

  test('should enforce 24 character limit and show helper text', async ({ page }) => {
    const input = await page.getByPlaceholder('Enter your name');
    const longName = 'ThisIsAVeryLongPlayerName1234';
    await input.fill(longName);
    
    await expect(input).toHaveValue(longName.slice(0, 24));

    const helperText = await page.getByText('Max. 24 characters');
    await expect(helperText).toBeVisible();
  });

  test('should have a submit button', async ({ page }) => {
    const submitButton = await page.getByRole('button', { name: 'Submit' });
    await expect(submitButton).toBeVisible();
  });

  test('should not submit with empty name', async ({ page }) => {
    const submitButton = await page.getByRole('button', { name: 'Submit' });
    await submitButton.click();

    await expect(page).toHaveURL('/');
  });

  test('should submit and redirect with valid name', async ({ page }) => {
    const input = await page.getByPlaceholder('Enter your name');
    await input.fill('TestPlayer');
    
    const submitButton = await page.getByRole('button', { name: 'Submit' });
    await submitButton.click();
    
    await expect(page).toHaveURL('/game-page');
  });

  test('should have correct background image', async ({ page }) => {
    const background = await page.locator('div').first();
    const backgroundImage = await background.evaluate((el) => 
      window.getComputedStyle(el).backgroundImage
    );
    expect(backgroundImage).toContain('WAM_bg.jpg');
  });
}); 