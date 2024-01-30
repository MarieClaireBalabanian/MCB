<template>
  <div id="app">
    <div class="meta-actions">
      <a class="sr-only sr-only-focusable" href="#main">Skip to Content</a>
    </div>
    <GlobalHeader />
    <slot />
    <GlobalFooter />
  </div>
</template> 

<script setup>
import { useWindowStore } from "@/stores/window";

const windowStore = useWindowStore();
const scroll = () => {
  windowStore.scrollTop = window.scrollY;
};
const resize = () => {
  windowStore.isDesktop = window.innerWidth >= 768;
  windowStore.windowHeight = window.innerHeight;
};
onMounted(() => {
  scroll();
  resize();
  window.addEventListener("scroll", scroll);
  window.addEventListener("resize", resize);
});
</script>