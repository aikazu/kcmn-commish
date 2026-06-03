import { test, expect } from "@playwright/test";

test("page loads and shows hero", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
});

test("nav has all sections", async ({ page }) => {
  await page.goto("/");
  const mainNav = page.getByRole("navigation", { name: /main/i });
  await expect(mainNav).toBeVisible();
  await expect(mainNav.getByRole("link", { name: /services/i })).toBeVisible();
  await expect(mainNav.getByRole("link", { name: /rate card/i })).toBeVisible();
});

test("anchor nav scrolls to rate card", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: /rate card/i }).first().click();
  await expect(page.locator("#rate-card")).toBeInViewport();
});

test("rate card CTAs link to WhatsApp with tier name", async ({ page }) => {
  await page.goto("/#rate-card");
  const links = page.getByRole("link").filter({ hasText: /pesan/i });
  const hrefs = await links.evaluateAll((els) => els.map((e) => e.getAttribute("href") ?? ""));
  const proLink = hrefs.find((h) => h.includes("wa.me/") && h.includes(encodeURIComponent("Pro")));
  expect(proLink).toBeDefined();
});

test("FAQ accordion expands on click", async ({ page }) => {
  await page.goto("/#faq");
  const faqButtons = page.locator("#faq button[aria-expanded]");
  await expect(faqButtons.nth(0)).toHaveAttribute("aria-expanded", "true");
  await faqButtons.nth(1).click();
  await expect(faqButtons.nth(1)).toHaveAttribute("aria-expanded", "true");
});

test("skip link is first focusable element", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  const focusedText = await page.evaluate(() => document.activeElement?.textContent);
  expect(focusedText).toContain("Skip");
});
