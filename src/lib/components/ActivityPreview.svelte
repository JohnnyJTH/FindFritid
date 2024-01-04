<script lang="ts">
    import type { Activities } from "$lib/types/db";

    import * as Dialog from "$lib/components/ui/dialog";
    import { truncate } from "$lib/utils";

    export let activity: Omit<Activities, "id">;
</script>

<div class="relative flex flex-col bg-card border border-border rounded-md overflow-hidden">
    <div class="aspect-w-3 aspect-h-2">
        <img style="view-transition-name: {activity.name.replaceAll(" ", "-")};" class="object-cover object-center sm:w-full sm:h-full" src={activity.cover} alt={activity.name} />
    </div>
    <div class="flex flex-1 flex-col p-4">
        <h3 class="text-foreground text-lg font-semibold">{activity.name}</h3>
        <Dialog.Root>
            <Dialog.Trigger asChild let:builder>
                <p use:builder.action {...builder} class="cursor-pointer text-muted-foreground text-sm">{truncate(activity.description)}</p>
            </Dialog.Trigger>
            <Dialog.Content>
                <Dialog.Header>
                    <Dialog.Title>{activity.name}</Dialog.Title>
                    <Dialog.Description>{activity.description}</Dialog.Description>
                </Dialog.Header>
            </Dialog.Content>
        </Dialog.Root>
    </div>
</div>
