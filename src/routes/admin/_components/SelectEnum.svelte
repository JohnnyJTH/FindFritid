<script lang="ts">
    import { Badge } from "$lib/components/ui/badge";
    import type { Activities } from "$lib/types/db";

    type Filter<T> = {
        [K in keyof T]: {
            fieldName: K;
            operator: "like" | "equal" | "notLike" | "notEqual";
            value: T[K];
        };
    }[keyof T];

    export let options: Filter<Activities>["value"][] = [];
    export let acticityProperty: Filter<Activities>["value"];

    const TRANSLATIONS = {
        Both: "Begge",
        Outdoor: "Udenfor",
        Indoor: "Indenfor",
        Neutral: "Neutralt",
        Male: "Mandlig",
        Female: "Kvindelig",
    };
    const translate = (str: Filter<Activities>["value"]) => TRANSLATIONS[str as keyof typeof TRANSLATIONS] || str;
</script>

<div class="flex">
    {#each options as option}
        <Badge
            on:click={() => {
                acticityProperty = option;
            }}
            class="mr-2 cursor-pointer"
            variant={option == acticityProperty ? "default" : "secondary"}>{translate(option)}</Badge
        >
    {/each}
</div>
