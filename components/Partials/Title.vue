<template>
  <h2 class="section-title h2" ref="titleRef">
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
    default: ''
  }
});

const titleRef = ref(null)

const initObserver = () => {
  const options = { threshold: .8}
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
  if (process.client) {
        initObserver();
    }
});
</script>


<style lang="scss">
.section-title {
        opacity: 0;
        transform: scale(.7);
        transition: .8s transform, .8s opacity;
        transform-origin: left center;

        
        &.showing {
            opacity: 1;
            transform: scale(1);
        }
}

</style>