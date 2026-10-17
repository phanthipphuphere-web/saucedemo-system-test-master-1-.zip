import { test, expect } from '@playwright/test';

test('แบบฝึกหัด 2: ลบสินค้าออกก่อน Checkout', async ({ page }) => {
  // 1. เข้าสู่ระบบ
  await page.goto('/');
  await page.locator('#user-name').fill('standard_user');
  await page.locator('#password').fill('secret_sauce');
  await page.locator('#login-button').click();

  // 2. กดเพิ่มสินค้าลงตะกร้า 2 ชิ้น
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();

  // 3. เปิดหน้าตะกร้า แล้วกดลบสินค้าออกไป 1 ชิ้น
  await page.locator('.shopping_cart_link').click();
  await page.locator('[data-test="remove-sauce-labs-bike-light"]').click();

  // 4. กด Checkout และกรอกข้อมูลผู้ซื้อ
  await page.locator('[data-test="checkout"]').click();
  await page.locator('#first-name').fill('John');
  await page.locator('#last-name').fill('Doe');
  await page.locator('#postal-code').fill('50000');
  await page.locator('[data-test="continue"]').click();

  // 5. ตรวจสอบว่าในหน้าสรุปยอด (Overview) เหลือสินค้าแค่ 1 ชิ้นจริงๆ
  await expect(page.locator('.cart_item')).toHaveCount(1);
  await expect(page.locator('.inventory_item_name')).toHaveText('Sauce Labs Backpack');
});