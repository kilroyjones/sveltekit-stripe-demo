<script lang="ts">
	import { onMount } from 'svelte';
	import { loadStripe } from '@stripe/stripe-js';
	import { PUBLIC_STRIPE } from '$env/static/public';

	export let data;

	onMount(async () => {
		const stripe = await loadStripe(PUBLIC_STRIPE);

		// Since you already have the client_secret from the server-side session,
		// you can skip the fetch to '/create-checkout-session' and directly use it.
		const clientSecret = data.client_secret;

		const initialize = async () => {
			if (stripe) {
				const checkout = await stripe.initEmbeddedCheckout({
					clientSecret // Use the clientSecret directly
				});
				// Mount Checkout
				checkout.mount('#checkout');
			}
		};

		initialize();
	});
</script>

<svelte:head>
	<script src="https://js.stripe.com/v3/"></script>
</svelte:head>

<div id="checkout">
	<!-- Checkout will insert the payment form here -->
</div>
