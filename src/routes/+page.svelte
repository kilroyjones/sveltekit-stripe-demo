<script lang="ts">
  export let data;
</script>

<div class="flex flex-col items-center justify-center h-screen">
  <div class="flex flex-col items-center justify-center mb-6 text-6xl font-bold text-info">
    <div class="flex items-center">
      <span>P</span>
      <img src="/pineapple.png" alt="pineapple" class="inline-block mx-1 h-14" />
      <span>neapple</span>
    </div>
    <span class="text-xl">of the month club</span>
  </div>

  {#if data.subscriptionStatus == "active" && data.subscriptionEndDate == undefined}
    <form method="POST" action="?/cancel">
      <input type="hidden" name="subscriptionId" value={data.subscriptionId} />
      <button class="p-5 text-white rounded-full min-w-32 bg-error"> Cancel </button>
    </form>
  {/if}

  {#if data.subscriptionStatus == "canceled"}
    <div class="text-warning">Account has been canceled.</div>
  {/if}

  {#if data.subscriptionStatus == "active" && data.subscriptionEndDate != undefined}
    <div class="mb-6 text-warning">
      This account has been canceled and will expire at the end of the current billing cycle.
    </div>
    <form method="POST" action="?/reset">
      <button class="p-5 text-white rounded-full min-w-32 bg-primary"> Reset </button>
    </form>
  {/if}

  {#if data.subscriptionStatus == "none"}
    <form method="POST" action="?/subscribe">
      <!-- Modify this value using your own Stripe price_id -->
      <input type="hidden" name="price_id" value="price_1OzfmXDsePVPAueu6YSvMCQN" />
      <button class="p-5 text-white rounded-full min-w-32 bg-info"> Subscribe</button>
    </form>
  {/if}
</div>
