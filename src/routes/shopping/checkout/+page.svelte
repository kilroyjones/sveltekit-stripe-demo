<script lang="ts">
  //   Modules and libraries
  import { onMount } from "svelte";
  import { loadStripe } from "@stripe/stripe-js";

  // Types and variables
  import { PUBLIC_STRIPE } from "$env/static/public";
  import { goto } from "$app/navigation";

  export let data;

  /**
   * Checkout onMount
   *
   * We receive the client secret from load and then attempt to load the
   * embedded checkout form.
   *
   */
  onMount(async () => {
    const stripe = await loadStripe(PUBLIC_STRIPE);
    const clientSecret = data.clientSecret;

    if (stripe && clientSecret) {
      const checkout = await stripe.initEmbeddedCheckout({
        clientSecret,
      });

      if (checkout) {
        checkout.mount("#checkout");
        return;
      }
    }

    // If everything above fails, then reroute to the error page
    goto("/shopping/error");
  });
</script>

<div class="flex items-center justify-center min-h-screen py-12">
  <div class="p-8 rounded-lg shadow-xl bg-secondary bg-opacity-40">
    <div id="checkout"></div>
  </div>
</div>
