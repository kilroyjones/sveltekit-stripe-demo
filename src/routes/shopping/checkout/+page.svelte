<script lang="ts">
	import { onMount } from 'svelte';
	import { loadStripe } from '@stripe/stripe-js';
	import { PUBLIC_STRIPE } from '$env/static/public';

	export let data;

	let stripeError: boolean = true;

	onMount(async () => {
		const stripe = await loadStripe(PUBLIC_STRIPE);
		const clientSecret = data.client_secret;

		if (stripe && clientSecret) {
			const checkout = await stripe.initEmbeddedCheckout({
				clientSecret
			});
			checkout.mount('#checkout');
			stripeError = false;
		}
	});
</script>

<svelte:head>
	<script src="https://js.stripe.com/v3/"></script>
</svelte:head>

<div class="flex items-center justify-center min-h-screen py-12">
	<div class="p-8 bg-white rounded-lg shadow-xl">
		<div id="checkout"></div>
	</div>
</div>
