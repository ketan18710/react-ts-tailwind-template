import { test, expect } from "@playwright/test";

test.describe("Story App", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("loads app and displays logo", async ({ page }) => {
    const logo = await page.getByTestId("app-logo");
    await expect(logo).toBeVisible();
  });

  test("displays stories on page load", async ({ page }) => {
    const storiesContainer = await page.getByTestId("stories-container");
    await expect(storiesContainer).toBeVisible();

    const storyItems = await page.getByTestId(/^story-\d+$/);
    expect(await storyItems.count()).toBeGreaterThan(0);
  });

  test("opens story when clicked", async ({ page }) => {
    const firstStory = await page.getByTestId("story-1");
    await firstStory.click();

    const storyView = await page.getByTestId("story-view");
    await expect(storyView).toBeVisible();
  });

  test("navigates to next story when right side is clicked", async ({
    page,
  }) => {
    const firstStory = await page.getByTestId("story-1");
    await firstStory.click();

    const storyImage = await page.getByTestId("story-image");
    const boundingBox = await storyImage.boundingBox();

    if (boundingBox) {
      await page.mouse.click(
        boundingBox.x + boundingBox.width * 0.8,
        boundingBox.y + boundingBox.height / 2
      );

      const storyUsername = await page.getByTestId("story-username");
      await expect(storyUsername).not.toHaveText("First User");
    } else {
      throw new Error("Could not get bounding box for story image");
    }
  });

  test("navigates to previous story when left side is clicked", async ({
    page,
  }) => {
    const firstStory = await page.getByTestId("story-2");
    await firstStory.click();

    const storyImage = await page.getByTestId("story-image");
    const boundingBox = await storyImage.boundingBox();

    if (boundingBox) {
      await page.mouse.click(
        boundingBox.x + boundingBox.width * 0.2,
        boundingBox.y + boundingBox.height / 2
      );

      const storyUsername = await page.getByTestId("story-username");
      await expect(storyUsername).not.toHaveText("Second User");
    } else {
      throw new Error("Could not get bounding box for story image");
    }
  });

  test("automatically jumps to next story", async ({ page }) => {
    const firstStory = await page.getByTestId("story-1");
    await firstStory.click();

    await page.waitForTimeout(6500);

    const storyUsername = await page.getByTestId("story-username");
    await expect(storyUsername).not.toHaveText("First User");
  });

  test("closes story when close button is clicked", async ({ page }) => {
    const firstStory = await page.getByTestId("story-1");
    await firstStory.click();

    const closeButton = await page.getByTestId("close-button");
    await closeButton.click();

    const storiesContainer = await page.getByTestId("stories-container");
    await expect(storiesContainer).toBeVisible();
  });
});
