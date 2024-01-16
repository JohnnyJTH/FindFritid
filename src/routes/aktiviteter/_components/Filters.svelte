<script lang="ts">
    import { Checkbox } from "$lib/components/ui/checkbox";
    import { Label } from "$lib/components/ui/label";
    import { RadioGroup, RadioGroupItem } from "$lib/components/ui/radio-group";
    import type { Activities } from "$lib/types/db";

    export let environment: Activities["environment"];
    export let gender: Activities["gender"];
    export let keywords: Record<string, boolean>;
</script>

<div class="divide-y-[1px] space-y-10 border-border">
    <div>
        <Label class="font-semibold">Miljø</Label>
        <RadioGroup bind:value={environment} class="pt-6">
            <div class="flex items-center space-x-2">
                <RadioGroupItem value="Both" id="both" />
                <Label for="both">Begge</Label>
            </div>
            <div class="flex items-center space-x-2">
                <RadioGroupItem value="Indoor" id="indoor" />
                <Label for="indoor">Indenfor</Label>
            </div>
            <div class="flex items-center space-x-2">
                <RadioGroupItem value="Outdoor" id="outdoor" />
                <Label for="outdoor">Udenfor</Label>
            </div>
        </RadioGroup>
    </div>
    <div class="pt-8">
        <Label class="font-semibold">Køn</Label>
        <RadioGroup bind:value={gender} class="pt-6">
            <div class="flex items-center space-x-2">
                <RadioGroupItem value="Neutral" id="neutral" />
                <Label for="neutral">Neutralt</Label>
            </div>
            <div class="flex items-center space-x-2">
                <RadioGroupItem value="Nale" id="male" />
                <Label for="male">Mandlig</Label>
            </div>
            <div class="flex items-center space-x-2">
                <RadioGroupItem value="Female" id="female" />
                <Label for="female">Kvindelig</Label>
            </div>
        </RadioGroup>
    </div>
    <div class="pt-8">
        <Label class="font-semibold">Nøgleord</Label>
        <div class="pt-6 space-y-3">
            {#each Object.keys(keywords) as keyword}
                <div class="flex items-center space-x-2">
                    <Checkbox bind:checked={keywords[keyword]} id={keyword} />
                    <Label for={keyword}>{keyword}</Label>
                </div>
            {/each}
        </div>
    </div>
</div>
