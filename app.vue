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
      const width = window.innerWidth;
      windowStore.isDesktop = width >= 768;     
      windowStore.windowWidth = width;
      windowStore.windowHeight = window.innerHeight;
    };
    onMounted(() => {
      scroll();
      resize();
      window.addEventListener('scroll', scroll);
      window.addEventListener('resize', resize);
    })
  </script>