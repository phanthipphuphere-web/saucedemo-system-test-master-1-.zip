import { test, expect } from '@playwright/test';

test('แบบฝึกหัด 1: เรียงราคาสินค้าจากน้อยไปมาก', async ({ page }) => {
  // 1. เข้าหน้าเว็บและเข้าสู่ระบบ
  await page.goto('/');
  await page.locator('#user-name').fill('standard_user');
  await page.locator('#password').fill('secret_sauce');
  await page.locator('#login-button').click();

  // 2. กดเลือกตัวเลือกเรียงราคาจาก "น้อยไปมาก" (Low to High)
  await page.locator('[data-test="product-sort-container"]').selectOption('lohi');

  // 3. ดึงราคาสินค้าทั้งหมดบนหน้าจอมาเก็บไว้ แล้วแปลงเป็นตัวเลข
  const priceElements = await page.locator('.inventory_item_price').allInnerTexts();
  const prices = priceElements.map(price => parseFloat(price.replace('$', '')));

  // 4. วนเช็คว่า ราคาชิ้นหน้า ต้องน้อยกว่าหรือเท่ากับ ราคาชิ้นถัดไป เสมอ
  for (let i = 0; i < prices.length - 1; i++) {
    expect(prices[i]).toBeLessThanOrEqual(prices[i + 1]);
  }
});