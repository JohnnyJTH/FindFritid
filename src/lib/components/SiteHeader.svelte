<script>
    import { toggleMode } from "mode-watcher";
    import { MainNav, MobileNav } from "./nav";
    import { Button } from "./ui/button";
    import { Moon, ShieldPlus, Sun } from "lucide-svelte";
</script>

<header
    class="bg-background/60 dark:bg-dark/60 sticky top-0 z-40 w-full border-b dark:border-white/10 shadow-sm backdrop-blur"
>
    <div class="page-container flex h-14 items-center">
        <MainNav />
        <MobileNav />
        <div class="flex flex-1 justify-end">
            <Button on:click={toggleMode} variant="outline" size="icon">
                <Sun
                    class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
                />
                <Moon
                    class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
                />
                <span class="sr-only">Toggle theme</span>
            </Button>
            <Button href="/admin" variant="outline" size="icon" class="ml-2">
                <ShieldPlus class="h-[1.2rem] w-[1.2rem]" />
                <span class="sr-only">Admin</span>
            </Button>
        </div>
    </div>
</header>
