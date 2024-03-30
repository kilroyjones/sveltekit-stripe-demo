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
		const id = form.get('id') as string;
		const session = await StripeService.subscribe(id);

		if (session?.client_secret) {
			locals.session.client_secret = session.client_secret;
			console.log(locals.session);
			redirect(303, '/shopping/checkout');
		}
		return { success: false, msg: '' };
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
		console.log('Canceling');
		return { success: true };
	}
} satisfies Actions;
