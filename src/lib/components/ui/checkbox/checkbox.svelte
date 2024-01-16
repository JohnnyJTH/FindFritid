<script lang="ts">
	import { Checkbox as CheckboxPrimitive } from "bits-ui";
	import { cn } from "$lib/utils";
	import { Check, Minus } from "lucide-svelte";

	type $$Props = CheckboxPrimitive.Props;
	type $$Events = CheckboxPrimitive.Events;

	let className: $$Props["class"] = undefined;
	export let checked: $$Props["checked"] = false;
	export { className as class };
</script>

<CheckboxPrimitive.Root class={cn("box-content peer inline-flex items-center justify-center rounded-md border border-muted bg-foreground sq-6 active:scale-98 data-[state=unchecked]:border-border data-[state=unchecked]:bg-background", className)} bind:checked on:click {...$$restProps}>
	<CheckboxPrimitive.Indicator class={"inline-flex items-center justify-center text-background"} let:isChecked let:isIndeterminate>
		{#if isChecked}
			<Check class="sq-[15px] stroke-[3px]" />
		{:else if isIndeterminate}
			<Minus class="sq-[15px] stroke-[3px]" />
		{/if}
	</CheckboxPrimitive.Indicator>
</CheckboxPrimitive.Root>
