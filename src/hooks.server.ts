// src/hooks.server.ts
import type { Handle } from '@sveltejs/kit';
import type { SessionData } from '$lib/types';

export const handle: Handle = async ({ event, resolve }) => {
	const sessionCookie = event.cookies.get('session-data');
	const sessionData: SessionData = sessionCookie ? JSON.parse(sessionCookie) : {};

	event.locals.session = sessionData;

	const response = await resolve(event);

	if (event.locals.session && Object.keys(event.locals.session).length > 0) {
		response.headers.set(
			'set-cookie',
			`session-data=${JSON.stringify(event.locals.session)}; Path=/; HttpOnly`
		);
	}

	return response;
};
