/**
 * This is simulating a database.
 */

import type { User } from '$lib/types';

let database: Array<User> = [
	{
		name: 'test',
		email: 'test@test.com',
		subscriptionStatus: 'none'
	}
];

/**
 * getUser
 *
 * This function gets our one and only user, but also check if their
 * subscription has run out and set it to expired. We don't handle that
 * on the home page.
 *
 */
const getUser = (): User | undefined => {
	let user: User | undefined = database[0];

	if (user) {
		if (user.subscriptionStatus && user.subscriptionEndDate) {
			const currentDate = new Date();
			if (currentDate.getTime() < user?.subscriptionEndDate) {
				user.subscriptionStatus = 'expired';
				user = updateUser(user);
			}
		}
	}
	return user;
};

/**
 * resetUser
 *
 * This is a convenience function which allows us to reset the demo.
 *
 */
const resetUser = () => {
	database = [
		{
			name: 'test',
			email: 'test@test.com',
			subscriptionStatus: 'none'
		}
	];
};

/**
 * upateUser
 *
 * Just updates the one and only user and then returns it.
 *
 */
const updateUser = (user: User): User | undefined => {
	database[0] = user;
	return user;
};

export const db = {
	getUser,
	resetUser,
	updateUser
};
