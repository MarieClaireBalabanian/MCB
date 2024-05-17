<template>
  <section ref="blockRef" class="text-white">
    <GlobalImage
      :gImage="block.image1.image"
      :size="700"
      load="eager"
      :style="{'opacity': .8 - progress}"
      class="teal"
    />
    <GlobalImage
      aria-hidden="true"
      :gImage="block.image1.image"
      :style="{'opacity': progress + .1}"
      :size="700"
      load="lazy"
      class="bw"
    />
    <div class="container">
      <h1 class="h1 heading" v-html="block.title"></h1>
      <h2 class="h2-alt heading text-redpink text-right">{{ block.subtitle}}</h2>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  block: Object,
  required: true
})

// Scroll Top
const windowStore = useWindowStore();
const scrollTop = computed(() => {
    return windowStore.scrollTop;
});


// Track Progress
const boundsTop = ref(Infinity);

const progress = computed(() => {
  let prog = scrollTop.value/boundsTop.value;
  if (prog < 0) return 0;
  if (prog > 1) return 1;
  return prog;
});

const updateProgress = () => {
    if (active.value) {
        let bounds = blockRef.value.getBoundingClientRect();
        boundsTop.value = bounds.bottom;
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

onUnmounted(() =>{
  if (observer.value) observer.value.disconnect();
})
</script>

<style lang="scss">

.block-hero {
    position: relative;
    overflow: hidden;
    background-color: $black;

  .container {
    min-height: 100vh;
    padding-top: 80px;
    padding-bottom: 80px;
    overflow: hidden;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .global-image {
    position: absolute;
    z-index: 1;
    &.teal {
      right: 0;
      top: 0;
      width: 40%;
      filter:  brightness(30%) hue-rotate(30deg);
    }
    &.bw {
      left: 0;
      bottom: 0;
      width: 35%;
      transform: translateY(38%);
      filter:  brightness(70%) hue-rotate(40deg);
    }
  }

  .heading {
    position: relative;
    width: 100%;
    z-index: 2;
    opacity: 0;
    filter: blur(5px);
    span {
      display: block;
    }
  }

  .h1 {
    animation: fadeIn 1.4s forwards 0.4s ease-in;
    span {
      &:last-child {
        text-align: right;
        @extend .text-stroke;
        @extend .stroke-white;
      }
    }
  }

  .h2-alt {
    margin-top: 40px;
    align-self: flex-end;
    animation: fadeIn 1.4s forwards 0.9s ease-in;
  }

  @media (max-width: 767px) {
    .global-image {
      &.teal {
        width: 80%;
      }
      &.bw {
        width: 70%;
      }
    }

    .h2-alt {
      align-self: unset;
    }
  }

  @keyframes fadeIn {
    100% {
      opacity: 1;
      filter: blur(0);
    }
  }
}
</style>