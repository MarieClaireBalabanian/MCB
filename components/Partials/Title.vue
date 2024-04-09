<template>
  <h2 class="section-title h2 pseudo-before" :class="[`text-${color}`, direction]" ref="titleRef" :style="{ '--color': color }">
    {{ title }}
  </h2>
</template>

<script setup>

/////
// TO DO. Some kind of weird animation thingy
/////


const props = defineProps({
  title: String,
  color: String,
  direction: String,
});
// const { direction, color } = toRefs(props)
// const titleRef = ref(null);

// import { useWindowStore } from '@/stores/window';
// const windowStore = useWindowStore();
// const windowWidth = computed(() => {
//     return windowStore.windowWidth;
// });



// const titleWidth = ref(0);

// const getPosition = () => {
//     let width;
//     let el = titleRef.value.getBoundingClientRect();
//     if (direction.value === 'to-right') width = el.left;
//     else width = windowWidth.value - el.right;
//     titleWidth.value = width;
//     console.log(width)
// }

// const styles = computed(() => {
//     return {
//     '--color': color.value, 
//     }
// });

// const initObserver = () => {
//   let observer = new IntersectionObserver((entries) => {
//     entries.forEach((entry) => {
//       if (entry.isIntersecting) {
//         entry.target.classList.add("showing");
//       }
//     });
//   });

//   observer.observe(titleRef.value);
//   observer.value = observer;
// };

// onMounted(() => {
//   if (process.client) {
//         // initObserver();
//     }
// });
</script>


<style lang="scss">
section.block {
    overflow: hidden;
    .h2 {
        span {
            opacity: .3;
            font-size: .3em;
            vertical-align: top;
            font-weight: 700;

        }
        // position: relative;
        // display: inline-block;
        // width: auto;

        // &::before {
        //     width: 60px;
        //     height: 3px;
        //     top: 50%;
        //     transform: translateY(-50%);
        //     background: var(--color);
        // }

        // &.to-right {
        //     &::before {
        //         right: calc(100% + 10px);
        //     }
        // }

        // &.to-left {
        //     &::before {
        //         background: $white;
        //         right: unset;
        //         left: calc(100% + 10px);
        //     }
        // }

        // &.showing {
        //     opacity: 1;
        //     transform: scale(1) translateY(0);
        // }
    }
}

</style>