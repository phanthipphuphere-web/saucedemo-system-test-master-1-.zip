import { test, expect } from '@playwright/test';

test('แบบฝึกหัด 3: แจ้งเตือนเมื่อไม่ได้กรอกรหัสไปรษณีย์', async ({ page }) => {
  // 1. เข้าสู่ระบบ
  await page.goto('/');
  await page.locator('#user-name').fill('standard_user');
  await page.locator('#password').fill('secret_sauce');
  await page.locator('#login-button').click();

  // 2. เลือกสินค้า 1 ชิ้น แล้วกดไปที่หน้า Checkout
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.locator('.shopping_cart_link').click();
  await page.locator('[data-test="checkout"]').click();

  // 3. กรอกแค่ชื่อกับนามสกุล แต่จงใจเว้น "รหัสไปรษณีย์" ให้ว่างไว้ แล้วกดไปต่อ
  await page.locator('#first-name').fill('John');
  await page.locator('#last-name').fill('Doe');
  await page.locator('#postal-code').fill(''); // เว้นว่าง
  await page.locator('[data-test="continue"]').click();

  // 4. ตรวจสอบว่ามีข้อความเตือนแดงๆ ขึ้นมาว่า "Error: Postal Code is required"
  await expect(page.locator('[data-test="error"]'))
    .toContainText('Error: Postal Code is required');
});