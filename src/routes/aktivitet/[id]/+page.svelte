<script lang="ts">
    import { Badge } from "$lib/components/ui/badge";
    import { translateOption } from "$lib/utils";
    import type { PageData } from "./$types";

    export let data: PageData;
    $: activity = data.activity;
</script>

<div class="page-container">
    <div class="header">
        <img class="w-full" src={activity.cover} alt={activity.name} />
        <div class="relative pl-3 mt-[-6em]">
            <div class="flex space-x-2">
                {#each activity.keywords as keyword}
                    <Badge class="rounded-none">{keyword}</Badge>
                {/each}
            </div>
            <div class="flex items-center bg-card-hover px-[0.25em] !mt-3 w-[calc(100%-20px)]">
                {#if activity.logo}
                    <img class="m-0 mr-2 w-12 h-12 rounded-full" src={activity.logo} alt={activity.name} />
                {/if}
                <h1 class="!m-0 py-[0.25em] !leading-[1.5em]">{activity.name}</h1>
            </div>
            <div class="meta flex not-prose">
                <p class="mr-1">af <span class="font-bold">{activity.union}</span></p>
                <p class="text-primary mr-1 before:mr-1 before:content-['·']">Miljø: {translateOption(activity.environment)}</p>
                <p class="text-primary mr-1 before:mr-1 before:content-['·']">Køn: {translateOption(activity.gender)}</p>
            </div>
        </div>
    </div>
    <div class="content pt-8 space-y-8">
        <p>
            {activity.description}
        </p>
    </div>
</div>
