<script lang="ts">
    import { createTagsInput, melt } from "@melt-ui/svelte";
    import type { Activities } from "@prisma/client";
    import { X } from "lucide-svelte";

    export let activity: Omit<Activities, "id">;
    export let id = "keywords";
    const {
        elements: { root, input, tag, deleteTrigger, edit },
        states: { tags },
    } = createTagsInput({
        defaultTags: activity.keywords,
        unique: true,
        maxTags: 10,
    });
    $: activity.keywords = $tags.map((t) => t.value);
</script>

<div class="flex flex-col items-start justify-center gap-2">
    <div
        use:melt={$root}
        class="flex min-w-[280px] flex-row flex-wrap gap-2.5 rounded-md border border-input bg-background px-3 py-2 text-white dark:text-black
      focus-within:ring focus-within:ring-primary"
    >
        {#each $tags as t}
            <div
                use:melt={$tag(t)}
                class="flex items-center overflow-hidden rounded-md bg-primary text-white dark:text-black [word-break:break-word]
        data-[disabled]:bg-primary/40 data-[selected]:bg-primary/60 data-[disabled]:hover:cursor-default
          data-[disabled]:focus:!outline-none data-[disabled]:focus:!ring-0"
            >
                <span class="flex items-center border-r border-white/10 px-1.5">{t.value}</span>
                <button use:melt={$deleteTrigger(t)} class="flex h-full items-center px-1 enabled:hover:bg-primary/60">
                    <X class="square-3" />
                </button>
            </div>
            <div use:melt={$edit(t)} class="flex items-center overflow-hidden rounded-md px-1.5 [word-break:break-word] data-[invalid-edit]:focus:!ring-destructive" />
        {/each}

        <input use:melt={$input} {id} type="text" placeholder="Skriv nøgleord..." class="bg-background min-w-[4.5rem] shrink grow basis-0 border-0 text-foreground outline-none focus:!ring-0 data-[invalid]:text-destructive" />
    </div>
</div>
