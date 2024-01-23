<template>
  <section class="carousel-component">
    <div class="carousel-inner" ref="carouselWrapperRef">
      <div v-for="(item, index) in images" :key="item" class="carousel-item" ref="slideRef" :data-num="index">
        <img :src="item.url" :alt="item.alt" :loading="index === 0 ? 'eager' : 'lazy'" />
      </div>
    </div>

    <ul v-if="images && images.length > 1" class="dots">
      <li v-for="(item, index) in images" :key="`${item}-dot`">
        <button @click="navigateTo(index)" :aria-current="active.indexOf(index) !== -1 ? true : null">
          <span class="sr-only">
            {{ active.indexOf(index) !== -1 ? `Current slide: ${index + 1}` : `Go to slide ${index + 1}` }}
          </span>
          <span class="dot" :class="{ active: active.indexOf(index) !== -1 }"></span>
        </button>
      </li>
    </ul>

  </section>
</template>

<script setup>

  const props = defineProps({
    images: {
      type: Array,
    },
  });

  const { images } = toRefs(props);

  // Variables
  const active = ref([0]);
  const slideRef = ref([]);
  const carouselWrapperRef = ref(null);
  const observer = ref(null);

  const setUpIntersectionObserver = () => {
    const options = {
      root: carouselWrapperRef.value,
      threshold: 0.9,
    };

    observer.value = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const current = parseInt(entry.target.getAttribute('data-num'), 10);
        if (entry.isIntersecting) {
          if (active.value.indexOf(current) === -1) {
            active.value.push(current);
          }
        } else {
          const index = active.value.indexOf(current);
          if (index !== -1) {
            active.value.splice(index, 1);
          }
        }
      });
    }, options);

    slideRef.value.forEach((item) => {
      observer.value.observe(item);
    });
  };

  const navigateTo = (i) => {
    const diff = i - active.value[0];
    let scroll = Math.floor(carouselWrapperRef.value.clientWidth) * diff;
    carouselWrapperRef.value.scrollBy({ left: scroll, behavior: 'smooth' })
  }

  onMounted(() => {
    setUpIntersectionObserver();
  });

  onBeforeUnmount(() => {
    if (observer.value) {
      observer.value.disconnect();
    }
    active.value = [];
    slideRef.value = [];
    carouselWrapperRef.value = null;

  });
</script>

<style lang="scss">
  .carousel-component {
    position: relative;

    .height-container {
      /* height: 360px; */
      position: relative;

      /* &::after {
          display: block;
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          transform: scale(-1);
          width: 100%;
          z-index: 1;
          height: 72px;
          background: linear-gradient(180deg, #000 0%, rgba(0, 0, 0, 0.56) 58.85%, rgba(0, 0, 0, 0) 100%);
        } */
    }

    .carousel-inner {
      display: flex;
      flex-wrap: nowrap;
      overflow-x: scroll;
      overflow-y: hidden;
      -webkit-overflow-scrolling: touch;
      scroll-snap-type: x mandatory;
      scroll-behavior: smooth;
      -webkit-overflow-scrolling: touch;
      -ms-overflow-style: none;
      scrollbar-width: none;
      align-items: flex-start;
      margin: 0;

      &::-webkit-scrollbar {
        display: none;
      }

      .carousel-item {
        flex: 0 0 100%;
        width: 100%;
        /* height: auto; */
        scroll-snap-align: start;
        position: relative;

        img {
          height: 100%;
          width: 100%;
          object-fit: contain;
          object-position: center;
          max-height: 600px;
        }
      }
    }

    .dots {
      margin-top: 18px;
      display: flex;
      justify-content: center;
      flex-wrap: wrap;

      button {
        width: 24px;
        height: 24px;
        display: flex;
        flex-direction: column;
        margin: 0 2px;

        .dot {
          width: 10px;
          height: 10px;
          display: block;
          margin: auto;
          border-radius: 50%;
          background: $white;
          border: 1px solid $blue;

          &.active {
            background: $blue;
          }

          &:hover,
          &:focus {
            background: $red;
            border-color: $red;
          }
        }
      }
    }
  }
</style>