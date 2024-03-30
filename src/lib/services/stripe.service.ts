import { Stripe } from 'stripe';
import { PUBLIC_DOMAIN, PUBLIC_STRIPE } from '$env/static/public';
import { PRIVATE_STRIPE } from '$env/static/private';

let stripe: Stripe | undefined;

/**
 *
 */
const subscribe = async (id: string): Promise<Stripe.Checkout.Session | undefined> => {
	if (stripe) {
		return await stripe.checkout.sessions.create({
			ui_mode: 'embedded',
			line_items: [
				{
					price: id,
					quantity: 1
				}
			],
			mode: 'subscription',
			return_url: `${PUBLIC_DOMAIN}/account/subscribed?session_id={CHECKOUT_SESSION_ID}`
		});
	}
};

// const getSessionStatus = async (
// 	id: string
// ): Promise<StripeLib.Response<StripeLib.Checkout.Session> | undefined> => {
// 	if (stripe) {
// 		return await stripe.checkout.sessions.retrieve(id);
// 	}
// };

/**
 *
 */
const initializeStripe = async (): Promise<boolean> => {
	if (PRIVATE_STRIPE) {
		stripe = new Stripe(PRIVATE_STRIPE);
		return true;
	}
	return false;
};

(async () => {
	const result = await initializeStripe();
	if (!result) {
		console.log('[Stripe service] - Failed to initialize');
	} else {
		console.log('[Stripe service] - Started');
	}
})();

export const StripeService = {
	subscribe
};
