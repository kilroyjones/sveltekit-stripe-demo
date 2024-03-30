// src/hooks.server.ts
import type { Handle } from '@sveltejs/kit';
import type { SessionData } from '$lib/types';

export const handle: Handle = async ({ event, resolve }) => {
	// Example of reading session data from a cookie or another store
	console.log('Session', event.locals);
	const sessionCookie = event.cookies.get('session-data');

	console.log('Cookie', sessionCookie);
	const sessionData: SessionData = sessionCookie ? JSON.parse(sessionCookie) : {};

	// Make session data available in endpoints and page load functions via locals
	event.locals.session = sessionData;

	const response = await resolve(event);

	// Optionally, update the session cookie based on modifications to event.locals.session
	// This would be where you serialize and set the session cookie again if it has changed
	if (event.locals.session && Object.keys(event.locals.session).length > 0) {
		response.headers.set(
			'set-cookie',
			`session-data=${JSON.stringify(event.locals.session)}; Path=/; HttpOnly`
		);
	}

	return response;
};
