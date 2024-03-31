import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
	await page.goto('http://localhost:5173/');
	await page.getByRole('button', { name: 'Subscribe' }).click();
	await page
		.frameLocator('iframe[name="embedded-checkout"]')
		.locator('div')
		.filter({ hasText: /^Email$/ })
		.nth(3)
		.click();
	await page.frameLocator('iframe[name="embedded-checkout"]').getByLabel('Email').click();
	await page
		.frameLocator('iframe[name="embedded-checkout"]')
		.getByLabel('Email')
		.fill('test@test.com');
	await page.frameLocator('iframe[name="embedded-checkout"]').getByLabel('Email').press('Tab');
	await page
		.frameLocator('iframe[name="embedded-checkout"]')
		.getByPlaceholder('1234 1234 1234')
		.fill('4242 4242 4242 4242');
	await page
		.frameLocator('iframe[name="embedded-checkout"]')
		.getByPlaceholder('1234 1234 1234')
		.press('Tab');
	await page
		.frameLocator('iframe[name="embedded-checkout"]')
		.getByPlaceholder('MM / YY')
		.fill('08');
	await page
		.frameLocator('iframe[name="embedded-checkout"]')
		.getByPlaceholder('MM / YY')
		.press('Tab');
	await page.frameLocator('iframe[name="embedded-checkout"]').getByPlaceholder('MM / YY').click();
	await page
		.frameLocator('iframe[name="embedded-checkout"]')
		.getByPlaceholder('MM / YY')
		.fill('08 / 26');
	await page.frameLocator('iframe[name="embedded-checkout"]').getByPlaceholder('CVC').click();
	await page.frameLocator('iframe[name="embedded-checkout"]').getByPlaceholder('CVC').fill('123');
	await page
		.frameLocator('iframe[name="embedded-checkout"]')
		.getByPlaceholder('Full name on card')
		.click();
	await page
		.frameLocator('iframe[name="embedded-checkout"]')
		.getByPlaceholder('Full name on card')
		.fill('Test');
	await page
		.frameLocator('iframe[name="embedded-checkout"]')
		.getByTestId('hosted-payment-submit-button')
		.click();
});
