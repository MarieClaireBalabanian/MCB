<template>
  <section v-if="block.blurbs" class="block-padding bottom-line" ref="blockRef">
  
    <div class="container text-white">
      <PartialsTitle :title="block.title" class="mb-20" />
      <div class="slides" ref="copyRef">
        <div
          class="copy"
          ref="slidesRef"
          v-for="(blurb, index) in block.blurbs"
          :key="`copy-${index}`"
          :data-num="index"
      
        >
          <div class="paragraph large">
            <SanityContent :blocks="blurb.copy" />
          </div>
      </div>
      </div>
        
    </div>
  </section>
</template>



<script setup>

const props = defineProps({
  block: Object,
  required: true
})

const slidesRef = ref(null);
const bounds = ref(0);
const boundsTop = ref(0);
const boundsHeight = ref(0);
const copyRef = ref(0);
// Scroll Top
const windowStore = useWindowStore();
const scrollTop = computed(() => {
    return windowStore.scrollTop;
});

// Track Progress

const progress = computed(() => {
  let prog = 0;
  let start = boundsTop.value + scrollTop.value;
  let end = start + boundsHeight.value;

  if (scrollTop.value >= start && scrollTop.value <= end) {
    prog = (scrollTop.value / end);
    if (prog < 0) prog = 0;
    if (prog > 1) prog = 1;
  }
  return prog;
});

const updateProgress = () => {
  if (active.value) {
      let bounds = copyRef.value.getBoundingClientRect();
      boundsTop.value = bounds.top;
      boundsHeight.value = bounds.height;
  }
};

watch(scrollTop, (newScrollTop) => {
  updateProgress();
});

// Intersection Observer
const observer = ref(null)
const blockRef = ref(null);
const active = ref(false);

const initObserver = () => {
  let obs = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        active.value = entry.isIntersecting;
    });
  });
  obs.observe(blockRef.value);
  observer.value = obs;
};

onMounted(() => {
  if (process.client) initObserver();
});

onUnmounted(() => {
  if (observer.value) observer.value.disconnect();
})
</script>


<style lang="scss">
.block-about {

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
  .fade-enter-to, .fade-leave {
    opacity: 1;
  }

  .fade-enter-active, .fade-leave-active {
    transition: .5s linear;
  }

  .container {
    position: relative;
    z-index: 3;
  }

  .copy {

    .paragraph {
      max-width: 52rem;
    }
    
    &:first-child {

    }

    &:last-child {
      .paragraph {
        margin-left: auto;
      }
    }
  }


  @keyframes grow {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(2);
    }
  }
}
</style>