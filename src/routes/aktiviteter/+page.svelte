<script lang="ts">
    import { Button } from "$lib/components/ui/button";
    import { Plus } from "lucide-svelte";
    import type { PageData } from "./$types";
    import Slider from "./_components/Slider.svelte";
    import { Activity } from "$lib/components";

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
                    <Activity {activity} />
                {/each}
            </div>
        </section>
    </div>
</div>
