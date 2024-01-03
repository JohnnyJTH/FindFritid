<script lang="ts">
    import { Badge } from "$lib/components/ui/badge";
    import type { Activities } from "$lib/types/db";
    import { type Filter, translateOption } from "$lib/utils";

    export let options: Filter<Activities>["value"][] = [];
    export let acticityProperty: Filter<Activities>["value"];
</script>

<div class="flex">
    {#each options as option}
        <Badge
            on:click={() => {
                acticityProperty = option;
            }}
            class="mr-2 cursor-pointer"
            variant={option == acticityProperty ? "default" : "secondary"}>{translateOption(option)}</Badge
        >
    {/each}
</div>
