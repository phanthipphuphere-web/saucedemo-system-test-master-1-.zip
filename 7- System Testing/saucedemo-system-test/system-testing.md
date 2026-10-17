# รายงานการทดสอบ System Testing ด้วย Playwright (SauceDemo)

เอกสารนี้รวบรวม Test Script สำหรับการทำ System Testing และแบบฝึกหัดเพิ่มเติมด้วย Playwright บนเว็บไซต์ SauceDemo

## 1. แบบฝึกหัด 1: Sort Product (เรียงลำดับสินค้าจากราคาต่ำไปสูง)
```typescript
import { test, expect } from '@playwright/test';

test('EX-01: ตรวจสอบการเรียงลำดับสินค้าจากราคาต่ำไปสูง', async ({ page }) => {
  await page.goto('/');
  await page.locator('#user-name').fill('standard_user');
  await page.locator('#password').fill('secret_sauce');
  await page.locator('#login-button').click();
  await expect(page).toHaveURL(/inventory\.html/);

  await page.locator('[data-test="product-sort-container"]').selectOption('lohi');

  const priceElements = await page.locator('.inventory_item_price').allInnerTexts();
  const prices = priceElements.map(p => parseFloat(p.replace('$', '')));
  const sortedPrices = [...prices].sort((a, b) => a - b);
  expect(prices).toEqual(sortedPrices);
});

import { test, expect } from '@playwright/test';

test('EX-02: ลบสินค้าออกใน Cart ก่อนหน้า Checkout แล้วตรวจสอบ Overview', async ({ page }) => {
  await page.goto('/');
  await page.locator('#user-name').fill('standard_user');
  await page.locator('#password').fill('secret_sauce');
  await page.locator('#login-button').click();

  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();

  await page.locator('.shopping_cart_link').click();
  await page.locator('[data-test="remove-sauce-labs-bike-light"]').click();

  await page.locator('[data-test="checkout"]').click();
  await page.locator('#first-name').fill('Narisara');
  await page.locator('#last-name').fill('Naprae');
  await page.locator('#postal-code').fill('50000');
  await page.locator('[data-test="continue"]').click();

  await expect(page.locator('.cart_item')).toHaveCount(1);
  await expect(page.locator('.inventory_item_name')).toHaveText('Sauce Labs Backpack');
});

import { test, expect } from '@playwright/test';

test('EX-03: ตรวจสอบ Validation เมื่อไม่กรอกรหัสไปรษณีย์', async ({ page }) => {
  await page.goto('/');
  await page.locator('#user-name').fill('standard_user');
  await page.locator('#password').fill('secret_sauce');
  await page.locator('#login-button').click();

  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.locator('.shopping_cart_link').click();
  await page.locator('[data-test="checkout"]').click();

  await page.locator('#first-name').fill('Narisara');
  await page.locator('#last-name').fill('Naprae');
  await page.locator('[data-test="continue"]').click();

  await expect(page.locator('[data-test="error"]')).toContainText('Postal Code is required');
  await expect(page).toHaveURL(/checkout-step-one\.html/);
});

