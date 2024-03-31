<script lang="ts">
	import { goto } from '$app/navigation';
</script>

<div class="flex flex-col items-center justify-center min-h-screen">
	<div class="mb-6">There was an error processing your request</div>

	<button class="p-5 text-white rounded-full min-w-32 bg-primary" on:click={() => goto('/')}>
		Home
	</button>
</div>
