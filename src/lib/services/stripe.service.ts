import { Stripe } from 'stripe';
import { PUBLIC_DOMAIN } from '$env/static/public';
import { PRIVATE_STRIPE } from '$env/static/private';

let stripe: Stripe | undefined;

/**
 *
 */
const cancel = async (email: string): Promise<boolean | undefined> => {
	if (stripe) {
		// Get customer based on email
		const customers = await stripe.customers.list({
			email: email,
			limit: 1
		});

		// Get subscription based on the customer
		if (customers.data.length > 0) {
			const customer = customers.data[0];
			const subscriptions = await stripe.subscriptions.list({
				customer: customer.id,
				status: 'active',
				limit: 1
			});

			// Update the customer's subscription
			if (subscriptions.data.length > 0) {
				const subscription = subscriptions.data[0];
				const updatedSubscription: Stripe.Subscription = await stripe.subscriptions.update(
					subscription.id,
					{
						cancel_at_period_end: true
					}
				);
				return true;
			}
		}
	}
	return false;
};

/**
 *
 */
const getStatus = async (sessionId: string): Promise<Stripe.Checkout.Session | undefined> => {
	if (stripe) {
		const session = await stripe.checkout.sessions.retrieve(sessionId);
		if (session) {
			return session;
		}
	}
};

/**
 *
 */
const subscribe = async (priceId: string): Promise<Stripe.Checkout.Session | undefined> => {
	if (stripe) {
		return await stripe.checkout.sessions.create({
			ui_mode: 'embedded',
			line_items: [
				{
					price: priceId,
					quantity: 1
				}
			],
			mode: 'subscription',
			return_url: `${PUBLIC_DOMAIN}/shopping/subscribed?session_id={CHECKOUT_SESSION_ID}`
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
	cancel,
	getStatus,
	subscribe
};
