<template>
  <h2
    class="section-title h2"
    ref="titleRef">
    {{ title }}
  </h2>
</template>
<script setup>
  /////
  // TO DO. Some kind of weird animation thingy
  /////

  const props = defineProps({
    title: {
      type: String,
      default: "",
    },
  });

  const titleRef = ref(null);
  const observer = ref(null);

  const initObserver = () => {
    const options = { threshold: 0.8 };
    let observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("showing");
        }
      });
    }, options);

    observer.observe(titleRef.value);
    observer.value = observer;
  };

  onMounted(() => {
    if (process.client) initObserver();
  });

  onUnmounted(() => {
    if (observer.value) observer.value.disconnect();
  });
</script>

<style lang="scss">
  .section-title {
    color: $white;
    opacity: 0;
    transform: scaleY(0.2);
    transition:
      0.9s transform ease,
      0.8s opacity;
    transform-origin: left center;
    &.showing {
      opacity: 1;
      transform: scaleY(1);
    }
  }
</style>
