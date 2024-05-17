<template>
  <ul class="tech" ref="listRef" :class="{ animate: animate }">
    <li
      :class="`li-${index}`"
      class="paragraph"
      v-for="(item, index) in skills"
      :key="`tech-${index}`"
    >
      <span>{{ item }}</span>
    </li>
  </ul>
</template>


<script setup>
const props = defineProps({
  skills: Array,
  animate: {
    type: Boolean,
    default: false,
  },
});

const { animate } = toRefs(props);

const observer = ref(null);
const listRef = ref(null);

const initObserver = () => {
  const options = { threshold: 0.3 };
  let obs = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("showing");
      } else {
      }
    }, options);
  });

  obs.observe(listRef.value);
  observer.value = obs;
};

onMounted(() => {
  if (process.client && animate.value) initObserver();
});

onUnmounted(() =>{
  if (observer.value) observer.value.disconnect();
})
</script>


<style lang="scss">
.tech {
  li {
    letter-spacing: 0.02em;
    font-weight: 400;
    font-size: 1.1rem;
    line-height: 1.2em;
    padding: 0.9em 1.3em 0.8em;
  }

  &.black {
    li {
      margin: 0.5em 1em 0.5em 0;
      border-radius: 0.2em;
      background: $teal;
      color: $black;
      letter-spacing: 0.01em;
      font-size: 0.9rem;
      line-height: 1.2em;
      padding: 0.5em 0.8em 0.5em;

      @media (max-width: 768px) {
        font-size: 0.8rem;
      }
    }
  }

  &.animate {

    li {
      transition: opacity 0.8s ease-out;
      opacity: 0;
      color: $white;
      font-family: $title;
      font-size:  clamp(1.2rem, 5vw, 1.8rem);
      padding: .4em .8em;
      min-height: 0.00001vw; // safari clamp resize
      letter-spacing: .1em;
      span {
        display: inline-block;
      }
      &:nth-child(even) {
        color: $redpink;
      }
    }

    @media (min-width: 768px) {
      @for $i from 1 to 23 {
        .li-#{$i} {
          transition-delay: $i * 0.1s;
        }
      }
    }

    &.showing {
      li {
        opacity: 1;
      }
    }
  }
}
</style>