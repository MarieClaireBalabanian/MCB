<template>
  <section v-if="block.blurbs" class="block-padding bottom-line" ref="blockRef">
    <div class="image-carousel">
      <div class="image-container">
        <transition-group name="fade">
          <GlobalImage v-for="(blurb, index) in block.blurbs"
              :key="`bg-${index}`"
              :gImage="blurb.image.image"
              :size="1200"
              load="lazy"
              class="absolute-cover background-cover"
              :class="{
                'zone': index === 0, 
                'trees': index === 1 
                }"
              v-show="index === 0 && progress < .7 || index === 1 && progress >= .7"
            />
        </transition-group>
        </div>
    </div>
  
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
  min-height: 100vh;
  margin-top: 50px;
  .image-carousel {
		position: absolute;
		inset: 0;
	}

  .trees {
    filter: invert(100%) hue-rotate(80deg) brightness(50%);
  }

  .zone {
    filter: brightness(80%) hue-rotate(170deg);
  }
	
	.image-container {
		position: sticky;
		top: 0;
    left: 0;
		width: 100%;
		min-height: 100vh;

    &::after {
      content: '';
      display: inline-block;
      position: absolute;
      inset: 0 0 0 0;
      z-index:0;
      background-image:radial-gradient(circle closest-side, transparent, $black);
    }
	}

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
    min-height: 50vh;

    .paragraph {
      max-width: 52rem;
    }
    
    &:first-child {
      min-height: 100vh;
      padding: 70vh 0 30vh;
    }

    &:last-child {
      padding: 70vh 0 30vh;
      .paragraph {
        margin-left: auto;
      }
    }
  }

  @media (min-width: 768px) {
    margin-top: 140px; 
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