<script lang="ts">
    import type { PageData } from "./$types";

    export let data: PageData;
</script>

<div class="page-container">
    {#each data.activities as activity}
        <div class="space-y-2">
            <h1>{activity.name}</h1>
            <p>{activity.keywords}</p>
        </div>
    {/each}
</div>
