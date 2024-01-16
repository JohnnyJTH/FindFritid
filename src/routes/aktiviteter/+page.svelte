<script lang="ts">
    import { createDialog, melt } from "@melt-ui/svelte";
    import { Plus } from "lucide-svelte";
    import type { PageData } from "./$types";
    import { Activity } from "$lib/components";
    import Filters from "./_components/Filters.svelte";
    import type { Activities } from "$lib/types/db";
    import { fade, fly } from "svelte/transition";

    export let data: PageData;
    const activities = data.activities;

    let keywords = Object.fromEntries(
        activities
            .flatMap((activity) => activity.keywords)
            .filter((keyword, index, keywords) => keywords.indexOf(keyword) === index)
            .map((keyword) => [keyword, false]),
    );
    let environment: Activities["environment"] = "Both";
    let gender: Activities["gender"] = "Neutral";
    $: filteredActivities = activities.filter((activity) => {
        if (environment !== "Both" && activity.environment !== environment) return false;
        if (gender !== "Neutral" && activity.gender !== gender) return false;
        if (Object.keys(keywords).some((keyword) => keywords[keyword] && !activity.keywords.includes(keyword))) return false;
        return true;
    });

    const {
        elements: { content, overlay, portalled, trigger },
        states: { open },
    } = createDialog({});
</script>

<div class="page-container not-prose">
    <div class="pt-16 pb-10 border-b border-border">
        <h1 class="text-foreground font-bold text-4xl">Aktiviteter</h1>
        <p class="mt-4 text-muted-foreground">Find en aktivitet der passer til dig.</p>
    </div>
    <div class="lg:grid lg:grid-cols-3 xl:grid-cols-4 lg:gap-8 pt-12">
        <aside>
            <h2 class="sr-only">Filtre</h2>
            <button use:melt={$trigger} class="inline-flex lg:hidden items-center text-sm font-medium">Filtre <Plus class="text-gray-500" /></button>
            <div class="hidden lg:block">
                <Filters bind:environment bind:gender bind:keywords />
            </div>
        </aside>
        <section class="mt-6 lg:mt-0 col-span-2 xl:col-span-3">
            <h2 class="sr-only">Aktiviteter</h2>
            <div class="grid gap-y-4 sm:grid-cols-2 xl:grid-cols-3 sm:gap-y-10 sm:gap-x-6 lg:gap-x-8">
                {#if filteredActivities.length > 0}
                    {#each filteredActivities as activity}
                        <Activity {activity} />
                    {/each}
                {:else}
                    <p>Ingen aktiviteter matchede din søgning.</p>
                {/if}
            </div>
        </section>
    </div>
</div>

<div use:melt={$portalled}>
    {#if $open}
        <div class="fixed inset-0 z-50 bg-background/50" transition:fade={{ duration: 150 }} use:melt={$overlay} />
        <div
            class="fixed right-0 top-0 z-50 h-screen w-full max-w-[350px] bg-background p-6
      shadow-lg border-r border-foreground/10 focus:outline-none"
            transition:fly={{
                duration: 300,
                opacity: 1,
                x: 350,
            }}
            use:melt={$content}
        >
            <Filters {environment} {gender} {keywords} />
        </div>
    {/if}
</div>
