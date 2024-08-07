import { PERSONALITIES, SPECIES } from '@/lib/constants';
import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should navigate to Villagers page', async ({ page }) => {
    await page.getByRole('link', { name: /Villagers/ }).click();
    await expect(page).toHaveURL(/villagers$/);
  });

  test('should navigate to Timeline page', async ({ page }) => {
    await page.getByRole('link', { name: /Timeline/ }).click();
    await expect(page).toHaveURL(/timeline$/);
  });

  test('should navigate to Stats page', async ({ page }) => {
    await page.getByRole('link', { name: /Stats/ }).click();
    await expect(page).toHaveURL(/stats$/);
  });

  test('should navigate to Search page', async ({ page }) => {
    await page.getByRole('link', { name: /Search/ }).click();
    await expect(page).toHaveURL(/search$/);
  });

  test('should navigate to About page', async ({ page }) => {
    await page.getByRole('link', { name: /About/ }).click();
    await expect(page).toHaveURL(/about$/);
  });

  test('should navigate to index page', async ({ page }) => {
    await page
      .getByRole('heading', { name: /My Animal Crossing Island/ })
      .click();
    await expect(page).toHaveURL(/3000\/?$/);
    await page.getByRole('button', { name: /Animal Crossing Leaf/ }).click();
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
      page.getByRole('heading', { name: /My Animal Crossing Island/ }),
    ).toBeVisible();
    await expect(
      page.getByRole('button', { name: /Animal Crossing Leaf/ }),
    ).toBeVisible();
    await expect(page.getByRole('link', { name: /Villagers/ })).toBeVisible();
    await expect(page.getByRole('link', { name: /Timeline/ })).toBeVisible();
    await expect(page.getByRole('link', { name: /Stats/ })).toBeVisible();
    await expect(page.getByRole('link', { name: /Search/ })).toBeVisible();
    await expect(page.getByRole('link', { name: /About/ })).toBeVisible();
  });

  test('show welcome content', async ({ page }) => {
    await expect(page.getByText(/Hello there!/)).toBeVisible();
    await expect(page.getByRole('img', { name: /My Villager/ })).toBeVisible();
  });

  test('show latest happenings', async ({ page }) => {
    await expect(page.getByText(/Latest Happenings/)).toBeVisible();
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
    await expect(
      page.getByRole('heading', { name: /My Animal Crossing Island/ }),
    ).not.toBeVisible();
    await page.mouse.wheel(0, -500);
    await expect(
      page.getByRole('heading', { name: /My Animal Crossing Island/ }),
    ).toBeVisible();
  });

  test('show legend', async ({ page }) => {
    await expect(page.getByText(/Current Resident/).first()).toBeInViewport();
    await expect(page.getByText(/Move-in date/).first()).toBeInViewport();
    await expect(page.getByText(/Photo date/).first()).toBeInViewport();
    await expect(page.getByText(/Move-out date/).first()).toBeInViewport();
    await expect(page.getByText(/Length of stay/).first()).toBeInViewport();
    await expect(
      page.getByText(/Current Resident/).nth(1),
    ).not.toBeInViewport();
    await expect(page.getByText(/Move-in date/).nth(1)).not.toBeInViewport();
    await expect(page.getByText(/Photo date/).nth(1)).not.toBeInViewport();
    await expect(page.getByText(/Move-out date/).nth(1)).not.toBeInViewport();
    await expect(page.getByText(/Length of stay/).nth(1)).not.toBeInViewport();
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
      page.getByText(/Current Resident/).first(),
    ).not.toBeInViewport();
    await expect(page.getByText(/Move-in date/).first()).not.toBeInViewport();
    await expect(page.getByText(/Photo date/).first()).not.toBeInViewport();
    await expect(page.getByText(/Move-out date/).first()).not.toBeInViewport();
    await expect(page.getByText(/Length of stay/).first()).not.toBeInViewport();
    await expect(page.getByText(/Move-in date/).nth(1)).toBeInViewport();
    await expect(page.getByText(/Photo date/).nth(1)).toBeInViewport();
    await expect(page.getByText(/Move-out date/).nth(1)).toBeInViewport();
    await expect(page.getByText(/Length of stay/).nth(1)).toBeInViewport();
    await page.mouse.wheel(0, -10);
    await expect(page.locator('.MuiStack-root > button').first()).toBeVisible();
    await expect(page.locator('.MuiStack-root > button').nth(1)).toBeVisible();
    await page.locator('.MuiStack-root > button').first().click();
    await expect(page.getByText(/Current Resident/).first()).toBeInViewport();
    await expect(page.getByText(/Move-in date/).first()).toBeInViewport();
    await expect(page.getByText(/Photo date/).first()).toBeInViewport();
    await expect(page.getByText(/Move-out date/).first()).toBeInViewport();
    await expect(page.getByText(/Length of stay/).first()).toBeInViewport();
    await expect(page.getByText(/Move-in date/).nth(1)).not.toBeInViewport();
    await expect(page.getByText(/Photo date/).nth(1)).not.toBeInViewport();
    await expect(page.getByText(/Move-out date/).nth(1)).not.toBeInViewport();
    await expect(page.getByText(/Length of stay/).nth(1)).not.toBeInViewport();
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

  test('should show timeline', async ({ page }) => {
    await expect(page.locator('canvas')).toBeVisible();
    await expect(
      page.getByRole('button', { name: /Timeline view/ }),
    ).toBeVisible();
  });

  test('should switch views on button click', async ({ page }) => {
    await expect(
      page.getByRole('button', { name: /Timeline view/ }),
    ).toBeVisible();
    await page.getByRole('button', { name: /Timeline view/ }).click();
    await expect(
      page.getByRole('button', { name: /Lined-up view/ }),
    ).toBeVisible();
    await page.getByRole('button', { name: /Lined-up view/ }).click();
    await expect(
      page.getByRole('button', { name: /Sorted view/ }),
    ).toBeVisible();
    await page.getByRole('button', { name: /Sorted view/ }).click();
    await expect(
      page.getByRole('button', { name: /Timeline view/ }),
    ).toBeVisible();
  });

  test('should be able to drag button', async ({ page }) => {
    await expect(page.locator('#dragFab')).toBeVisible();
    const draggableTimelineMode = page
      .locator('#dragFab')
      .getByTestId('OpenWithRoundedIcon');
    const origLocation = await draggableTimelineMode.boundingBox();
    await draggableTimelineMode.dragTo(page.locator('canvas'), {
      targetPosition: { x: 100, y: 100 },
    });
    const newLocation = await draggableTimelineMode.boundingBox();
    expect(origLocation!.x).not.toEqual(newLocation!.x);
    expect(origLocation!.y).not.toEqual(newLocation!.y);
  });

  test('should show draggable tooltip', async ({ page }) => {
    await expect(page.locator('canvas')).toBeVisible();
    await page.waitForTimeout(1000);
    await expect(page.locator('#dragHandle')).not.toBeVisible();
    const canvasBox = await page.locator('canvas').boundingBox();
    await page.mouse.move(canvasBox!.x, canvasBox!.y);
    await page.mouse.move(
      canvasBox!.x + canvasBox!.width,
      canvasBox!.y + canvasBox!.height,
      { steps: 10 },
    );
    await expect(page.locator('#dragHandle')).toBeVisible();
    const draggableTooltip = page.locator('#dragHandle');
    const origLocation = await draggableTooltip.boundingBox();
    await draggableTooltip.dragTo(page.locator('canvas'), {
      targetPosition: { x: 100, y: 100 },
    });
    const newLocation = await draggableTooltip.boundingBox();
    expect(origLocation!.x).not.toEqual(newLocation!.x);
    expect(origLocation!.y).not.toEqual(newLocation!.y);
  });
});

test.describe('Stats', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/stats');
  });

  test('should show general stats', async ({ page }) => {
    const section = page.getByTestId('generalBox');
    await expect(section.getByText(/Number of Villagers/)).toBeVisible();
    await expect(section.getByText(/Number of Villagers/)).toHaveText(
      /^Number of Villagers: \d+$/,
    );
    await expect(section.getByText(/Current Residents:/)).toBeVisible();
    await expect(section.getByRole('link')).toHaveCount(10);
  });

  test('should show Length of Stay stats', async ({ page }) => {
    const section = page.getByTestId('lengthOfStayBox');
    await expect(section.getByText(/Length of Stay/)).toBeVisible();
    await expect(section.getByText(/Average/)).toBeVisible();
    await expect(section.getByText(/Average/)).toHaveText(
      /^Average: \d+\.\d{2} days$/,
    );
    await expect(section.getByText(/Longest/)).toBeVisible();
    await expect(section.getByText(/Longest/)).toHaveText(
      /^Longest: \d+ days$/,
    );
    await expect(section.getByText(/Shortest/)).toBeVisible();
    await expect(section.getByText(/Shortest/)).toHaveText(
      /^Shortest: \d+ days?$/,
    );
    const count = await section.getByRole('link').count();
    expect(count).toBeGreaterThanOrEqual(3);
    await expect(
      section.getByRole('button', { name: /Full breakdown/ }),
    ).toBeVisible();
    await section.getByRole('button', { name: /Full breakdown/ }).click();
    await expect(page).toHaveURL(/stats\/lengthOfStay$/);
    await expect(page.getByText(/Length of Stay Breakdown/)).toBeVisible();
    await expect(
      page.getByRole('columnheader', { name: /Villager/ }),
    ).toBeVisible();
    await expect(
      page.getByRole('columnheader', { name: /Length of Stay \(days\)/ }),
    ).toBeVisible();
    await expect(
      page.getByRole('columnheader', { name: /Move-in Date/ }),
    ).toBeVisible();
    await expect(
      page.getByRole('columnheader', { name: /Move-out Date/ }),
    ).toBeVisible();
  });

  test('should show Length of Stay breakdown', async ({ page }) => {
    await page.goto('/stats/lengthOfStay');
    await expect(page.getByText(/Length of Stay Breakdown/)).toBeVisible();
    await expect(
      page.getByRole('columnheader', { name: /Villager/ }),
    ).toBeVisible();
    await expect(
      page.getByRole('columnheader', { name: /Length of Stay \(days\)/ }),
    ).toBeVisible();
    await expect(
      page.getByRole('columnheader', { name: /Move-in Date/ }),
    ).toBeVisible();
    await expect(
      page.getByRole('columnheader', { name: /Move-out Date/ }),
    ).toBeVisible();
  });

  test('should show Species stats', async ({ page }) => {
    const section = page.getByTestId('speciesBox');
    await expect(section.getByText(/Species/)).toBeVisible();
    await expect(section.getByText(/Most common/)).toBeVisible();
    await expect(section.getByText(/Most common/)).toHaveText(
      /^Most common: \w+$/,
    );
    await expect(
      section.getByRole('button', { name: /Full breakdown/ }),
    ).toBeVisible();
    await section.getByRole('button', { name: /Full breakdown/ }).click();
    await expect(page).toHaveURL(/stats\/species$/);
    await expect(page.getByText(/Species Breakdown/)).toBeVisible();
    for (const spec of SPECIES) {
      const specRegexp = new RegExp(`${spec}: \\d+`);
      await expect(page.getByText(specRegexp)).toBeVisible();
    }
  });

  test('should show Species breakdown', async ({ page }) => {
    await page.goto('/stats/species');
    await expect(page.getByText(/Species Breakdown/)).toBeVisible();
    for (const spec of SPECIES) {
      const specRegexp = new RegExp(`${spec}: \\d+`);
      await expect(page.getByText(specRegexp)).toBeVisible();
    }
  });

  test('should show Personality stats', async ({ page }) => {
    const section = page.getByTestId('personalityBox');
    await expect(section.getByText(/Personality/)).toBeVisible();
    await expect(section.getByText(/Most common/)).toBeVisible();
    await expect(section.getByText(/Most common/)).toHaveText(
      /^Most common: \w+$/,
    );
    await expect(
      section.getByRole('button', { name: /Full breakdown/ }),
    ).toBeVisible();
    await section.getByRole('button', { name: /Full breakdown/ }).click();
    await expect(page).toHaveURL(/stats\/personality$/);
    await expect(page.getByText(/Personality Breakdown/)).toBeVisible();
    for (const pers of PERSONALITIES) {
      const persRegexp = new RegExp(`${pers}: \\d+`);
      await expect(page.getByText(persRegexp)).toBeVisible();
    }
  });

  test('should show Personality breakdown', async ({ page }) => {
    await page.goto('/stats/personality');
    await expect(page.getByText(/Personality Breakdown/)).toBeVisible();
    for (const pers of PERSONALITIES) {
      const persRegexp = new RegExp(`${pers}: \\d+`);
      await expect(page.getByText(persRegexp)).toBeVisible();
    }
  });

  test('should show Gender stats', async ({ page }) => {
    const section = page.getByTestId('genderBox');
    await expect(section.getByText(/Gender/)).toBeVisible();
    await expect(section.getByText(/Female/)).toBeVisible();
    await expect(section.getByText(/Female/)).toHaveText(/^Female: \d+$/);
    await expect(section.getByText(/Male/)).toBeVisible();
    await expect(section.getByText(/Male/)).toHaveText(/^Male: \d+$/);
    await expect(
      section.getByRole('button', { name: /Full breakdown/ }),
    ).toBeVisible();
    await section.getByRole('button', { name: /Full breakdown/ }).click();
    await expect(page).toHaveURL(/stats\/gender$/);
    await expect(page.getByText(/Gender Breakdown/)).toBeVisible();
    await expect(page.getByText(/Female: \d+/)).toHaveCount(2);
    await expect(page.getByText(/Male: \d+/)).toHaveCount(2);
  });

  test('should show Gender breakdown', async ({ page }) => {
    await page.goto('/stats/gender');
    await expect(page.getByText(/Gender Breakdown/)).toBeVisible();
    await expect(page.getByText(/Female: \d+/)).toBeVisible();
    await expect(page.getByText(/Male: \d+/)).toBeVisible();
  });

  test('should show Photos stats', async ({ page }) => {
    const section = page.getByTestId('photosBox');
    await expect(section.getByText(/Photos/)).toBeVisible();
    await section.getByTestId('InfoOutlinedIcon').click();
    await expect(page.getByText(/You can interact with/)).toBeVisible();
    await section.getByTestId('InfoOutlinedIcon').click();
    await expect(section.getByText(/You can interact with/)).not.toBeVisible();
    await expect(section.getByText(/Given/)).toBeVisible();
    await expect(section.getByText(/Given/)).toHaveText(
      /^Given: \d+ \(\d+\.\d{2}%\)$/,
    );
    await expect(section.getByText(/Average time to give/)).toBeVisible();
    await expect(section.getByText(/Average time to give/)).toHaveText(
      /^Average time to give: \d+\.\d{2} days$/,
    );
    await expect(section.getByText(/Quickest/)).toBeVisible();
    await expect(section.getByText(/Quickest/)).toHaveText(
      /^Quickest: \d+ days$/,
    );
    await expect(section.getByText(/Slowest/)).toBeVisible();
    await expect(section.getByText(/Slowest/)).toHaveText(
      /^Slowest: \d+ days$/,
    );
    await expect(
      section.getByText(/Shortest stay after giving photo/),
    ).toBeVisible();
    await expect(
      section.getByText(/Shortest stay after giving photo/),
    ).toHaveText(/^Shortest stay after giving photo: \d+ days$/);
    await expect(
      section.getByText(/Longest stay after giving photo/),
    ).toBeVisible();
    await expect(
      section.getByText(/Longest stay after giving photo/),
    ).toHaveText(/^Longest stay after giving photo: \d+ days$/);
    await expect(
      section.getByText(/Longest stay without giving photo/),
    ).toBeVisible();
    await expect(
      section.getByText(/Longest stay without giving photo/),
    ).toHaveText(/^Longest stay without giving photo: \d+ days$/);
    await expect(
      section.getByRole('button', { name: /Full breakdown/ }),
    ).toBeVisible();
    await section.getByRole('button', { name: /Full breakdown/ }).click();
    await expect(page).toHaveURL(/stats\/photos$/);
    await expect(page.getByText(/Photos Breakdown/)).toBeVisible();
    await expect(
      page.getByText(/Time to give \(stay after giving\)/),
    ).toBeVisible();
    await expect(page.getByText(/Stay without giving/)).toBeVisible();
    await expect(page.getByText(/\d+ days \(\d+ days\)/).first()).toBeVisible();
  });

  test('should show Photos breakdown', async ({ page }) => {
    await page.goto('/stats/photos');
    await expect(page.getByText(/Photos Breakdown/)).toBeVisible();
    await expect(
      page.getByText(/Time to give \(stay after giving\)/),
    ).toBeVisible();
    await expect(page.getByText(/Stay without giving/)).toBeVisible();
    await expect(page.getByText(/\d+ days \(\d+ days\)/).first()).toBeVisible();
  });

  test('should show Islandmates stats', async ({ page }) => {
    const section = page.getByTestId('islandmatesBox');
    await expect(section.getByText(/Islandmates/)).toBeVisible();
    await expect(section.getByText(/Most islandmates/)).toBeVisible();
    await expect(section.getByText(/Most islandmates/)).toHaveText(
      /^Most islandmates: \d+$/,
    );
    await expect(section.getByText(/Fewest islandmates/)).toBeVisible();
    await expect(section.getByText(/Fewest islandmates/)).toHaveText(
      /^Fewest islandmates: \d+$/,
    );
    await expect(
      section.getByRole('button', { name: /Full breakdown/ }),
    ).toBeVisible();
    await section.getByRole('button', { name: /Full breakdown/ }).click();
    await expect(page).toHaveURL(/stats\/islandmates$/);
    await expect(page.getByText('Islandmates Breakdown')).toBeVisible();
  });

  test('should show Islandmates breakdown', async ({ page }) => {
    await page.goto('/stats/islandmates');
    await expect(page.getByText('Islandmates Breakdown')).toBeVisible();
  });
});

test.describe('Search', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/search');
  });

  test('should show Search page', async ({ page }) => {
    await expect(page.getByLabel(/^Name$/)).toBeVisible();
    await expect(page.getByLabel(/^Species$/)).toBeVisible();
    await expect(page.getByLabel(/^Personality$/)).toBeVisible();
    await expect(page.getByText(/^All$/)).toBeVisible();
    await expect(page.getByRole('button', { name: /^Reset$/ })).toBeVisible();
    await expect(
      page.getByTestId('searchResults').getByRole('link'),
    ).toHaveCount(413);
  });

  test('should show results when searched by Name', async ({ page }) => {
    const searchResults = page.getByTestId('searchResults');
    // combobox.fill doesn't seem to work with webkit
    // await page.getByRole('combobox', { name: /^Name$/ }).fill('z');
    await page.getByRole('combobox', { name: /^Name$/ }).pressSequentially('z');
    await expect(searchResults.getByRole('link')).toHaveCount(13);
    // await page.getByRole('combobox', { name: /^Name$/ }).fill('za');
    await page.getByRole('combobox', { name: /^Name$/ }).pressSequentially('a');
    await expect(searchResults.getByRole('link')).toHaveCount(1);
    await page.getByRole('button', { name: /^Reset$/ }).click();
    await expect(searchResults.getByRole('link')).toHaveCount(413);
  });

  test('should show results when searched by Species', async ({ page }) => {
    const searchResults = page.getByTestId('searchResults');
    await page.getByLabel(/^Species$/).click();
    await page.getByRole('option', { name: /^Alligator$/ }).click();
    await expect(searchResults.getByRole('link')).toHaveCount(8);
    await page.getByRole('option', { name: /^Anteater$/ }).click();
    await expect(searchResults.getByRole('link')).toHaveCount(16);
    await page.getByLabel(/^Clear$/).click();
    await expect(searchResults.getByRole('link')).toHaveCount(413);
  });

  test('should show results when searched by Personality', async ({ page }) => {
    const searchResults = page.getByTestId('searchResults');
    await page.getByLabel(/^Personality$/).click();
    await page.getByRole('option', { name: /^Cranky$/ }).click();
    await expect(searchResults.getByRole('link')).toHaveCount(57);
    await page.getByRole('option', { name: /^Big sister$/ }).click();
    await expect(searchResults.getByRole('link')).toHaveCount(83);
    await page.getByLabel(/^Clear$/).click();
    await expect(searchResults.getByRole('link')).toHaveCount(413);
  });

  test('should show results when searched by Gender', async ({ page }) => {
    const searchResults = page.getByTestId('searchResults');
    await page.getByText('All').click();
    await page.getByRole('option', { name: /^Female$/ }).click();
    await expect(searchResults.getByRole('link')).toHaveCount(199);
    await page
      .getByText(/^Female$/)
      .first()
      .click();
    await page.getByRole('option', { name: /^Male$/ }).click();
    await expect(searchResults.getByRole('link')).toHaveCount(214);
    await page.getByRole('button', { name: /^Reset$/ }).click();
    await expect(searchResults.getByRole('link')).toHaveCount(413);
  });

  test('should show results when searched with multiple filters', async ({
    page,
  }) => {
    const searchResults = page.getByTestId('searchResults');
    await expect(searchResults.getByRole('link')).toHaveCount(413);
    await page.getByLabel(/^Species$/).click();
    await page.getByRole('option', { name: /^Cat$/ }).click();
    await expect(searchResults.getByRole('link')).toHaveCount(23);
    await page
      .getByLabel(/^Species$/)
      .first()
      .click();
    await page.getByLabel(/^Personality$/).click();
    await page.getByRole('option', { name: /^Peppy$/ }).click();
    await expect(searchResults.getByRole('link')).toHaveCount(5);
    await page
      .getByLabel(/^Personality$/)
      .first()
      .click();
    await page.getByText(/^All$/).click();
    await page.getByRole('option', { name: /^Male$/ }).click();
    await expect(searchResults.getByRole('link')).toHaveCount(0);
    await expect(searchResults.getByText(/^No results.$/)).toBeVisible();
    await page
      .getByText(/^Male$/)
      .first()
      .click();
    await page.getByRole('option', { name: /^Female$/ }).click();
    await expect(searchResults.getByRole('link')).toHaveCount(5);
    await page.getByRole('combobox', { name: /^Name$/ }).fill('n');
    await expect(searchResults.getByRole('link')).toHaveCount(1);
    await expect(
      searchResults.getByRole('link', { name: 'Tangy' }),
    ).toBeVisible();
    await page.getByRole('combobox', { name: /^Name$/ }).press('Escape');
    await page.getByRole('button', { name: /^Reset$/ }).click();
    await expect(searchResults.getByRole('link')).toHaveCount(413);
  });
});

test.describe('About', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/about');
  });

  test('should show About page', async ({ page }) => {
    await expect(
      page.getByRole('img', { name: 'Animal Crossing: New Horizons' }),
    ).toBeVisible();
    await expect(
      page.getByText('Animal Crossing: New Horizons is a simulation game'),
    ).toBeVisible();
    await expect(page.getByRole('img', { name: 'My Villager' })).toBeVisible();
    await expect(
      page.getByText('I have been playing Animal Crossing'),
    ).toBeVisible();
  });
});
