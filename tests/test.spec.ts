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

  test('show welcome content', async ({ page }) => {
    await expect(page.getByText('Hello there!')).toBeVisible();
    await expect(page.getByRole('img', { name: 'My Villager' })).toBeVisible();
  });

  test('show latest happenings', async ({ page }) => {
    await expect(page.getByText('Latest Happenings')).toBeVisible();
    await expect(page.getByRole('listitem')).toHaveCount(10);
    await expect(page.getByText(/\w+ \d{1,2}, \d{4}/)).toHaveCount(10);
  });
});

test.describe('Villagers', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/villagers');
    await page
      .locator('.MuiGrid-root > div')
      .first()
      .waitFor({ state: 'visible' });
  });

  test('app bar disappears/reappears on scroll down/up ', async ({ page }) => {
    await page.mouse.wheel(0, 500);
    await page.waitForTimeout(500);
    await expect(
      page.getByRole('heading', { name: 'My Animal Crossing Island' }),
    ).not.toBeVisible();
    await page.mouse.wheel(0, -500);
    await page.waitForTimeout(500);
    await expect(
      page.getByRole('heading', { name: 'My Animal Crossing Island' }),
    ).toBeVisible();
  });

  test('show legend', async ({ page }) => {
    await expect(page.getByText('Current Resident').first()).toBeInViewport();
    await expect(page.getByText('Move-in date').first()).toBeInViewport();
    await expect(page.getByText('Photo date').first()).toBeInViewport();
    await expect(page.getByText('Move-out date').first()).toBeInViewport();
    await expect(page.getByText('Length of stay').first()).toBeInViewport();
    await expect(
      page.getByText('Current Resident').nth(1),
    ).not.toBeInViewport();
    await expect(page.getByText('Move-in date').nth(1)).not.toBeInViewport();
    await expect(page.getByText('Photo date').nth(1)).not.toBeInViewport();
    await expect(page.getByText('Move-out date').nth(1)).not.toBeInViewport();
    await expect(page.getByText('Length of stay').nth(1)).not.toBeInViewport();
  });

  test('show scroll buttons on scroll', async ({ page }) => {
    await page.mouse.wheel(0, 10);
    await page.locator('.MuiStack-root > button').first().waitFor();
    await expect(page.locator('.MuiStack-root > button').first()).toBeVisible();
    await expect(page.locator('.MuiStack-root > button').nth(1)).toBeVisible();
  });

  test('scroll buttons scroll to bottom/top of page', async ({ page }) => {
    await page.mouse.wheel(0, 10);
    await page.locator('.MuiStack-root > button').first().waitFor();
    await expect(page.locator('.MuiStack-root > button').first()).toBeVisible();
    await expect(page.locator('.MuiStack-root > button').nth(1)).toBeVisible();
    await page.locator('.MuiStack-root > button').nth(1).click();
    await expect(
      page.getByText('Current Resident').first(),
    ).not.toBeInViewport();
    await expect(page.getByText('Move-in date').first()).not.toBeInViewport();
    await expect(page.getByText('Photo date').first()).not.toBeInViewport();
    await expect(page.getByText('Move-out date').first()).not.toBeInViewport();
    await expect(page.getByText('Length of stay').first()).not.toBeInViewport();
    await expect(page.getByText('Move-in date').nth(1)).toBeInViewport();
    await expect(page.getByText('Photo date').nth(1)).toBeInViewport();
    await expect(page.getByText('Move-out date').nth(1)).toBeInViewport();
    await expect(page.getByText('Length of stay').nth(1)).toBeInViewport();
    await page.mouse.wheel(0, -10);
    await expect(page.locator('.MuiStack-root > button').first()).toBeVisible();
    await expect(page.locator('.MuiStack-root > button').nth(1)).toBeVisible();
    await page.locator('.MuiStack-root > button').first().click();
    await expect(page.getByText('Current Resident').first()).toBeInViewport();
    await expect(page.getByText('Move-in date').first()).toBeInViewport();
    await expect(page.getByText('Photo date').first()).toBeInViewport();
    await expect(page.getByText('Move-out date').first()).toBeInViewport();
    await expect(page.getByText('Length of stay').first()).toBeInViewport();
    await expect(page.getByText('Move-in date').nth(1)).not.toBeInViewport();
    await expect(page.getByText('Photo date').nth(1)).not.toBeInViewport();
    await expect(page.getByText('Move-out date').nth(1)).not.toBeInViewport();
    await expect(page.getByText('Length of stay').nth(1)).not.toBeInViewport();
    await expect(
      page.locator('.MuiStack-root > button').first(),
    ).not.toBeVisible();
    await expect(
      page.locator('.MuiStack-root > button').nth(1),
    ).not.toBeVisible();
  });
});

test.describe('Timeline', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/timeline');
  });
});

test.describe('Stats', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/stats');
  });
});

test.describe('Search', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/search');
  });
});

test.describe('About', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/about');
  });
});
