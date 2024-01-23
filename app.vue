<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

 <script setup>

    import { useWindowStore } from '@/stores/window';
  
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
      window.addEventListener('scroll', scroll);
      window.addEventListener('resize', resize);
    })
  </script>