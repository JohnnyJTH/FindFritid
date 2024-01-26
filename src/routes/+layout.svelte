<script>
    import { page } from "$app/stores";
    import { SiteHeader, ViewTransition } from "$lib/components";
    import { Toaster } from "$lib/components/toaster";
    import { toTitleCase } from "$lib/utils";
    import "../app.pcss";
    import { ModeWatcher } from "mode-watcher";

    $: title =
        $page.url.pathname == "/"
            ? "FindFritid"
            : `${toTitleCase($page.url.pathname.split("/").slice(-1)[0].replace("-", " "))} - FindFritid`;
</script>

<svelte:head>
    <title>{title}</title>
</svelte:head>

<ModeWatcher />
<Toaster />
<ViewTransition />
<SiteHeader />

<div class="prose dark:prose-invert max-w-none">
    <slot />
</div>
