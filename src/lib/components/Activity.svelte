<script lang="ts">
    import type { Activities } from "$lib/types/db";

    import { truncate } from "$lib/utils";

    export let activity: Activities;
</script>

<a
    href={`/aktivitet/${activity.id}`}
    class="relative flex flex-col bg-card border border-border rounded-md overflow-hidden cursor-pointer"
>
    <div class="aspect-w-3 aspect-h-2">
        <img
            style="view-transition-name: {activity.name.replaceAll(' ', '-')};"
            class="object-cover object-center sm:w-full sm:h-full"
            src={activity.cover}
            alt={activity.name}
        />
    </div>
    <div class="flex flex-1 flex-col p-4">
        <h3 class="text-foreground text-lg font-semibold">{activity.name}</h3>
        <p class="cursor-pointer text-muted-foreground text-sm">
            {truncate(activity.description)}
        </p>
    </div>
</a>
