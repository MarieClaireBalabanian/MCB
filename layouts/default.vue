<template>
  <div id="app">
    <SpeedInsights/>
    <div class="meta-actions">
      <a
        class="sr-only sr-only-focusable"
        href="#main"
        >Skip to Content</a
      >
    </div>
    <GlobalHeader />
    <slot />
    <GlobalFooter />
  </div>
</template>

<script setup>
  import { SpeedInsights } from "@vercel/speed-insights/nuxt"
  import { useWindowStore } from "@/stores/window";
  const windowStore = useWindowStore();
  const scroll = () => {
    windowStore.scrollTop = window.scrollY;
  };

  onMounted(() => {
    scroll();
    window.addEventListener("scroll", scroll);
  });

  onUnmounted(() => {
    window.removeEventListener("scroll", scroll);
  });
</script>
