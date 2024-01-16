<script lang="ts">
    import { Checkbox } from "$lib/components/ui/checkbox";
    import { Label } from "$lib/components/ui/label";
    import { RadioGroup, RadioGroupItem } from "$lib/components/ui/radio-group";
    import type { Activities } from "$lib/types/db";

    export let environment: Activities["environment"];
    export let gender: Activities["gender"];
    export let keywords: string[];
</script>

<div class="divide-y-[1px] space-y-10 border-border">
    <div>
        <Label class="font-semibold">Miljø</Label>
        <RadioGroup value="both" class="pt-6">
            <div class="flex items-center space-x-2">
                <RadioGroupItem value="both" id="both" />
                <Label for="both">Begge</Label>
            </div>
            <div class="flex items-center space-x-2">
                <RadioGroupItem value="indoor" id="indoor" />
                <Label for="indoor">Indenfor</Label>
            </div>
            <div class="flex items-center space-x-2">
                <RadioGroupItem value="outdoor" id="outdoor" />
                <Label for="outdoor">Udenfor</Label>
            </div>
        </RadioGroup>
    </div>
    <div class="pt-8">
        <Label class="font-semibold">Køn</Label>
        <RadioGroup value="neutral" class="pt-6">
            <div class="flex items-center space-x-2">
                <RadioGroupItem value="neutral" id="neutral" />
                <Label for="neutral">Neutralt</Label>
            </div>
            <div class="flex items-center space-x-2">
                <RadioGroupItem value="male" id="male" />
                <Label for="male">Mandlig</Label>
            </div>
            <div class="flex items-center space-x-2">
                <RadioGroupItem value="female" id="female" />
                <Label for="female">Kvindelig</Label>
            </div>
        </RadioGroup>
    </div>
    <div class="pt-8">
        <Label class="font-semibold">Nøgleord</Label>
        <div class="pt-6 space-y-3">
            {#each keywords as keyword}
                <div class="flex items-center space-x-2">
                    <Checkbox id={keyword} />
                    <Label for={keyword}>{keyword}</Label>
                </div>
            {/each}
        </div>
    </div>
</div>
