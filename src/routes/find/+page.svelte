<script lang="ts">
    import { Button } from "$lib/components/ui/button";
    import { Plus } from "lucide-svelte";
    import type { PageData } from "./$types";
    import Slider from "./_components/Slider.svelte";

    export let data: PageData;
</script>

<div class="page-container not-prose">
    <div class="pt-16 pb-10 border-b border-border">
        <h1 class="text-foreground font-bold text-4xl">Aktiviteter</h1>
        <p class="mt-4 text-muted-foreground">Find en aktivitet der passer til dig.</p>
    </div>
    <div class="lg:grid lg:grid-cols-3 xl:grid-cols-4 lg:gap-8 pt-12">
        <aside>
            <h2 class="sr-only">Filtre</h2>
            <Button class="lg:hidden" variant="ghost">Filtre <Plus class="text-gray-500" /></Button>
            <div class="hidden lg:block">
                <Slider value={[70]} />
            </div>
        </aside>
        <section class="mt-6 lg:mt-0 col-span-2 xl:col-span-3">
            <h2 class="sr-only">Aktiviteter</h2>
            <div class="grid gap-y-4 sm:grid-cols-2 xl:grid-cols-3 sm:gap-y-10 sm:gap-x-6 lg:gap-x-8">
                {#each data.activities as activity}
                        <div class="relative flex flex-col bg-card border border-border rounded-md overflow-hidden">
                        <div class="aspect-w-3 aspect-h-2">
                            <img class="object-cover object-center sm:w-full sm:h-full" src={activity.cover} alt={activity.name} />
                        </div>
                        <div class="flex flex-1 flex-col p-4">
                            <h3 class="text-foreground text-lg font-semibold">{activity.name}</h3>
                            <p class="text-muted-foreground text-sm">lorem</p>
                        </div>
                    </div>
                {/each}
            </div>
        </section>
    </div>
</div>
