<script>
  import { SiteHeader } from "$lib/components";
  import { Toaster } from "$lib/components/toaster";
  import "../app.pcss";
  import { ModeWatcher } from "mode-watcher";
</script>

<ModeWatcher />
<Toaster />
<SiteHeader />

<div class="prose dark:prose-invert">
  <slot />
</div>
