import { test, expect } from "@playwright/test";

test.use({ reducedMotion: "reduce" });

test("hero text is immediately visible with reduced motion", async ({ page }) => {
  await page.goto("/");
  const h1 = page.getByRole("heading", { level: 1 });
  await expect(h1).toBeVisible();
  // With reduced motion, child spans settle to opacity 1 (no entrance animation);
  // give a brief moment for the motion runtime to apply final state.
  await expect
    .poll(async () => h1.evaluate((el) => getComputedStyle(el).opacity), { timeout: 2000 })
    .toBe("1");
});

test("FAQ opens instantly with reduced motion", async ({ page }) => {
  await page.goto("/#faq");
  const faqButtons = page.locator("#faq button[aria-expanded]");
  await expect(faqButtons.nth(0)).toHaveAttribute("aria-expanded", "true");
  await faqButtons.nth(1).click();
  await expect(faqButtons.nth(1)).toHaveAttribute("aria-expanded", "true");
});
