<script lang="ts">
    import * as HoverCard from "$lib/components/ui/hover-card";
    import { Label } from "$lib/components/ui/label";
    import { Slider } from "$lib/components/ui/slider";
    import type { Slider as SliderPrimitive } from "bits-ui";

    export let value: SliderPrimitive.Props["value"];
</script>

<div class="grid gap-2 pt-2">
    <HoverCard.Root openDelay={200} closeDelay={100}>
        <HoverCard.Trigger asChild let:builder>
            <div class="grid gap-4" use:builder.action {...builder}>
                <div class="flex items-center justify-between">
                    <Label for="top-p">Afstand</Label>
                    <span
                        class="w-12 rounded-md border border-transparent px-2 py-0.5 text-right text-sm text-muted-foreground hover:border-border"
                    >
                        {value}
                    </span>
                </div>
                <Slider
                    id="distance"
                    max={100}
                    bind:value
                    step={5}
                    class="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
                    aria-label="Afstand"
                />
            </div>
        </HoverCard.Trigger>
        <HoverCard.Content class="w-[260px] text-sm" side="right" align="start"
            >Hvor langt aktiviteten må være væk.</HoverCard.Content
        >
    </HoverCard.Root>
</div>
