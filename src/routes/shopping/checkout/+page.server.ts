import type { PageServerLoad } from './$types';

export const load: PageServerLoad = ({ locals }) => {
	return {
		client_secret: locals.session.client_secret
	};
};
