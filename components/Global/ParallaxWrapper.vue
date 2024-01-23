<template>
    <div>
        <div class="parallax-wrapper" ref="slotHolderRef" :style="{ transform: transform }">
            <slot></slot>
        </div>
    </div>
</template>


<script setup>
    import { ref, watch, onMounted, useSlots, computed, toRefs } from 'vue'
    import { useWindowStore } from '@/stores/window';
    const windowStore = useWindowStore();

    const slots = useSlots();
    const slotHolderRef = ref(null);

    const props = defineProps({
        x: {
            type: [Number, String],
            default: 0,
        },
        y: {
            type: [Number, String],
            default: 0,
        },
    })

    const { x, y } = toRefs(props)

    const height = ref(0)
    const width = ref(0)
    const topPosition = ref(0)
    const shouldTransform = ref(true)


    const transform = computed(() => {
        let xV = parseInt(x.value, 10) * (progress.value * 2 - 1);
        let yV = parseInt(y.value, 10) * (progress.value * 2 - 1);

        return `translate(${xV}px, ${yV}px)`;
    })

    const scrollTop = computed(() => {
        return windowStore.scrollTop;
    });

    const windowHeight = computed(() => {
        return windowStore.windowHeight;
    })

    const progress = computed(() => {
        let yV = parseInt(y.value, 10);
        let min = topPosition.value - windowHeight.value - yV;
        let max = topPosition.value + height.value + yV;
        let range = max - min;

        let val = clamp((scrollTop.value - min) / range, 0, 1)
        return val;
    })

    const clamp = (number, lower, upper) => {

        const lowerClampedValue = Math.max(number, lower);

        const clampedValue = Math.min(lowerClampedValue, upper);

        return clampedValue;

    }


    watch([windowHeight, scrollTop], ([newWindowHeight, newScrollTop], [prevWindowHeight, prevScrollTop]) => {
        setValues()
    });


    const setPosition = () => {
        let el = slotHolderRef.value;
        if (el) {
            let bounds = el.getBoundingClientRect();
            topPosition.value = bounds.top + (document.scrollingElement ? document.scrollingElement.scrollTop : 0);
        }
    }

    const setSize = () => {
        let el = slotHolderRef.value;
        if (el) {
            height.value = el.offsetHeight;
            width.value = el.offsetWidth;
        }
    }

    const setValues = () => {
        setPosition();
        setSize();
    }


    onMounted(() => {
        setPosition();
        setSize();
    })


</script>


<style lang="scss">
    .parallax-wrapper {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
</style>
