<script lang="ts">
    import { page } from "$app/stores";
    import { Badge } from "$lib/components/ui/badge";
    import { Button } from "$lib/components/ui/button";
</script>

<div class="page-container flex flex-col items-center my-12">
    <Badge>{$page.status}</Badge>
    <h1 class="mb-4">{$page.error?.message ?? "En ukendt fejl er opstået"}</h1>
    {#if $page.status === 404}
        <p class="m-0">Denne side findes ikke.</p>
    {/if}
    <Button href="/" class="mt-4 no-underline">Gå til forsiden</Button>
</div>
