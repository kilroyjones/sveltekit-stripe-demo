// Modules and libraries
import { StripeService } from '$lib/services/stripe.service';
import { redirect } from '@sveltejs/kit';

// Types
import type { Actions } from './$types';

import type { PageServerLoad } from './$types';
import { db } from '$lib/database/client';

/**
 * Home page load
 *
 * Check the current status of the subscription and return to the page so adjust
 * the options as necessary.
 *
 */
export const load: PageServerLoad = async ({ locals }) => {
	const user = db.getUser();

	if (user) {
		console.log(user);
		return {
			subscriptionStatus: user.subscriptionStatus,
			subscriptionId: user.subscriptionId,
			subscriptionEndDate: user.subscriptionEndDate
		};
	}
};

/**
 * Form actions
 *
 * There are only subscribe and cancel, which are accessible based on the result
 * of the above load statement and what it returns to the page.
 *
 */
export const actions = {
	/**
	 * Subscribe
	 *
	 * Retrieve the price id from the form data. This should have been created in
	 * the Stripe developer's console, then create a subscription. If the sessins
	 * was successful a client secret is returned and that is passed back to the
	 * user via cookies in hooks.server.ts.
	 */
	subscribe: async ({ locals, request }) => {
		const form = await request.formData();
		const priceId = form.get('price_id') as string;
		const session = await StripeService.subscribe(priceId);

		if (session?.client_secret) {
			locals.session.client_secret = session.client_secret;
			redirect(302, '/shopping/checkout');
		}
		redirect(302, '/shopping/error');
	},

	/**
	 * Cancel
	 *
	 * Retrieve the email from the form data, then attempt to cancel the
	 * subscription. Redirect according to success of error.
	 */
	cancel: async ({ request }) => {
		const form = await request.formData();
		const subscriptionId = form.get('subscriptionId') as string;
		const subscription = await StripeService.cancel(subscriptionId);

		if (subscription) {
			const user = db.getUser();
			if (user) {
				user.subscriptionStatus = subscription.status;
				user.subscriptionEndDate = subscription.cancel_at as number;
				db.updateUser(user);
				redirect(302, '/shopping/canceled');
			}
		}
		redirect(302, '/shopping/error');
	},

	/**
	 * Reset
	 *
	 * Quick reset so the demo can be run again from the top.
	 */
	reset: async () => {
		db.resetUser();
		redirect(302, '/');
	}
} satisfies Actions;
