<script lang="ts">
	import { RadioGroup as RadioGroupPrimitive } from "bits-ui";
	import { cn } from "$lib/utils";

	type $$Props = RadioGroupPrimitive.ItemProps & {
		value: string;
	};
	type $$Events = RadioGroupPrimitive.ItemEvents;

	let className: $$Props["class"] = undefined;
	export let value: $$Props["value"];
	export { className as class };
</script>

<RadioGroupPrimitive.Item {value} class={cn("shrink-0 sq-5 rounded-full border border-border-input bg-background transition-all duration-150 ease-in-out hover:border-dark-40 data-[state=checked]:border-6 data-[state=checked]:border-foreground", className)} {...$$restProps} on:click />
