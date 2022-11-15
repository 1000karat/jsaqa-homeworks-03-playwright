const { test, expect } = require("@playwright/test");
import { email, password } from "../user.js";

test.beforeEach(async ({ page }) => {
  await page.goto("https://netology.ru/?modal=sign_in");
});

test("Success authorization netology", async ({ page }) => {
  await page.locator('[name="email"]').fill(email);
  await page.locator('[name="password"]').fill(password);
  await page.locator('[data-testid="login-submit-btn"]').click();

  const header = await page.locator("h2").first();
  await expect(header).toHaveText("Мои курсы и профессии");

  await page.screenshot({
    path: "image/screenshot_" + Date.now() + ".png",
  });
});

test("Failed authorization netology", async ({ page }) => {
  await page.locator('[name="email"]').fill("exemple@gmail.com");
  await page.locator('[name="password"]').fill("password");
  await page.locator('[data-testid="login-submit-btn"]').click();

  const errorText = page.locator('[data-testid="login-error-hint"]');
  await expect(errorText).toHaveText("Вы ввели неправильно логин или пароль");

  await page.screenshot({
    path: "image/screenshot_" + Date.now() + ".png",
  });
});
