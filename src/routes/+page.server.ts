// Modules and libraries
import { StripeService } from '$lib/services/stripe.service';
import { redirect } from '@sveltejs/kit';

// Types
import type { Actions } from './$types';

/**
 *
 */
export const actions = {
	/**
	 *
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
	 *
	 */
	renew: async ({ request }) => {
		console.log('Renewing');
		return { success: true };
	},

	/**
	 *
	 */
	cancel: async ({ request }) => {
		const form = await request.formData();
		const email = form.get('email') as string;
		const isCancel = await StripeService.cancel(email);

		if (isCancel) {
			redirect(302, '/shopping/canceled');
		}
		redirect(302, '/shopping/error');
	}
} satisfies Actions;
