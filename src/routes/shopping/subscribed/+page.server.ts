// Modules and libraries
import { StripeService } from '$lib/services/stripe.service';
import { redirect } from '@sveltejs/kit';

// Types and variables
import type { PageServerLoad } from './$types';
import { db } from '$lib/database/client';
import type Stripe from 'stripe';

/**
 * Subscribed load
 *
 * The *session_id* is passed from the url assigned upon subscribing. Here we
 * check if the sessionId is null or not and then route accordingly. After that
 * we check the status of the session, meaning has it been paid or not, or then
 * route based on that.
 *
 */
export const load: PageServerLoad = async ({ locals, url }) => {
	const sessionId = url.searchParams.get('session_id');
	if (sessionId == null) {
		redirect(302, '/shopping/error');
	}

	const session = await StripeService.getSession(sessionId);
	if (session?.payment_status != 'paid') {
		redirect(302, '/shopping/error');
	}

	/**
	 * If everything worked we need to save the payment information for that
	 * particular user, though if we can't find the user we should roll back the
	 * charge. This rollback has not been implemented.
	 *
	 */
	let user = db.getUser();

	if (user) {
		user.customerId = session.customer as string;
		user.subscriptionId = session.subscription as string;
		user.subscriptionStartDate = new Date().getTime();

		const subscription = (await StripeService.getSubscription(
			user.subscriptionId
		)) as Stripe.Subscription;

		user.subscriptionStatus = subscription.status;

		return db.updateUser(user);
	} else {
		// Insert payment rollback
	}

	redirect(302, '/shopping/error');
};
