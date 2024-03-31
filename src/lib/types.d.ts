export type User = {
	name: string;
	email: string;
	customerId?: string;
	subscriptionId?: string;
	subscriptionStartDate?: number;
	subscriptionEndDate?: number;
	/**
	 * Possible values are incomplete, incomplete_expired, trialing, active,
	 * past_due, canceled, unpaid, or paused, though we only held active and
	 * canceled.
	 *
	 */
	subscriptionStatus?: string;
};

export type SessionData = {
	client_secret: string?;
};
