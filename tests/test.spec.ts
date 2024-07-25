import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should navigate to Villagers page', async ({ page }) => {
    await page.getByRole('link', { name: 'Villagers' }).click();
    await expect(page).toHaveURL(/villagers$/);
  });

  test('should navigate to Timeline page', async ({ page }) => {
    await page.getByRole('link', { name: 'Timeline' }).click();
    await expect(page).toHaveURL(/timeline$/);
  });

  test('should navigate to Stats page', async ({ page }) => {
    await page.getByRole('link', { name: 'Stats' }).click();
    await expect(page).toHaveURL(/stats$/);
  });

  test('should navigate to Search page', async ({ page }) => {
    await page.getByRole('link', { name: 'Search' }).click();
    await expect(page).toHaveURL(/search$/);
  });

  test('should navigate to About page', async ({ page }) => {
    await page.getByRole('link', { name: 'About' }).click();
    await expect(page).toHaveURL(/about$/);
  });

  test('should navigate to index page', async ({ page }) => {
    await page
      .getByRole('heading', { name: 'My Animal Crossing Island' })
      .click();
    await expect(page).toHaveURL(/3000\/?$/);

    await page.getByRole('button', { name: 'Animal Crossing Leaf' }).click();
    await expect(page).toHaveURL(/3000\/?$/);
  });
});

test.describe('Index', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });
  test('has title', async ({ page }) => {
    await expect(page).toHaveTitle(/My Animal Crossing Island/);
  });
  test('show app bar', async ({ page }) => {
    await expect(
      page.getByRole('heading', { name: 'My Animal Crossing Island' }),
    ).toBeVisible();
    await expect(
      page.getByRole('button', { name: 'Animal Crossing Leaf' }),
    ).toBeVisible();
    await expect(page.getByRole('link', { name: 'Villagers' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Timeline' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Stats' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Search' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'About' })).toBeVisible();
  });
  test('show welcome text', async ({ page }) => {
    await expect(page.getByText('Hello there!')).toBeVisible();
    await expect(page.getByRole('img', { name: 'My Villager' })).toBeVisible();
  });
});
