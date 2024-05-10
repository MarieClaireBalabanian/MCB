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
      :gImage="block.image2.image"
      :style="{'opacity': progress  + .3}"
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

const windowStore = useWindowStore();

const boundsTop = ref(Infinity);
const active = ref(false);
const blockRef = ref(null);
const observer = ref(null)

const scrollTop = computed(() => {
    return windowStore.scrollTop;
});

watch(scrollTop, (newScrollTop) => {
    updateProgress();
});

const progress = computed(() => {
  let prog = scrollTop.value/boundsTop.value;

  if (prog < 0) {
    return 0;
  }
  if (prog > 1) {
    return 1;
  }
  return prog;
});

const initObserver = () => {
    let obs = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            active.value = entry.isIntersecting;
        });
    });
    obs.observe(blockRef.value);
    observer.value = obs;
};

const updateProgress = () => {
    if (active.value) {
        let bounds = blockRef.value.getBoundingClientRect();
        boundsTop.value = bounds.bottom;
    }
};

onMounted(() => {
    initObserver();
});
</script>

<style lang="scss">

.block-hero {
    position: relative;
    overflow: hidden;
    background-color: $black;
  // background-image: url('/img/tron2.png') ;
  // background-position: bottom center;
  // background-repeat: no-repeat;
  // background-size: 100% auto;
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
      background: $teal;
      mix-blend-mode: difference;
      filter:  brightness(35%) ;
    }
    &.bw {
      left: 0;
      bottom: 0;
      width: 35%;
      transform: translateY(38%);
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