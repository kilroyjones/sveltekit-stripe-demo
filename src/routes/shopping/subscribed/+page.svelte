<script lang="ts">
	import { goto } from '$app/navigation';

	export let data;
</script>

<div class="flex flex-col items-center justify-center min-h-screen py-12">
	<div class="mb-6">Thank you <span class="font-bold">{data.name}</span> for your purchase!</div>
	<button class="p-5 text-white rounded-full min-w-32 bg-primary" on:click={() => goto('/')}>
		Home
	</button>
</div>
