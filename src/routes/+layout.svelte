<script>
  import { SiteHeader, ViewTransition } from "$lib/components";
  import { Toaster } from "$lib/components/toaster";
  import "../app.pcss";
  import { ModeWatcher } from "mode-watcher";
</script>

<ModeWatcher />
<Toaster />
<ViewTransition />
<SiteHeader />

<div class="prose dark:prose-invert max-w-none">
  <slot />
</div>
