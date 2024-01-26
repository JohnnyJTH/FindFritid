<script>
    import { page } from "$app/stores";
    import { cn } from "$lib/utils";
    import { LandPlot } from "lucide-svelte";

    import { mainNavItems } from "./links";
</script>

<div class="mr-4 hidden lg:flex">
    <a class="mr-6 flex items-center space-x-2" href="/">
        <LandPlot />
        <span class="hidden font-bold sm:inline-block">FindFritid</span>
    </a>
    <nav class="flex items-center space-x-6 text-sm font-medium">
        {#each mainNavItems as navItem}
            <a
                class={cn(
                    "transition-colors hover:text-foreground/80",
                    decodeURI($page.url.pathname) === navItem.href
                        ? "text-foreground"
                        : "text-foreground/60",
                )}
                href={navItem.href}
                rel={navItem.external ? "noreferrer" : undefined}
                target={navItem.external ? "_blank" : undefined}
            >
                {navItem.title}
            </a>
        {/each}
    </nav>
</div>
