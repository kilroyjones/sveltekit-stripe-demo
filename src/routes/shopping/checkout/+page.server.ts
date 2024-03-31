import type { PageServerLoad } from './$types';

/**
 * Checkout load
 *
 * This ensures that on checkout the client secret is passed to the component and that
 * the embedded Stripe checkout form can be accessed.
 *
 */
export const load: PageServerLoad = ({ locals }) => {
	return {
		client_secret: locals.session.client_secret
	};
};
