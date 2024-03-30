// Modules and libraries
import { StripeService } from '$lib/services/stripe.service';
import { redirect } from '@sveltejs/kit';

// Types and variables
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
	const sessionId = url.searchParams.get('session_id');
	if (sessionId) {
		const session = await StripeService.getStatus(sessionId);
		if (session?.payment_status != 'paid') {
			redirect(302, '/shopping/error');
		}
	}
};
