<template>
	<ul
		:class="`tech ${animate ? 'animated' : ''}`"
		ref="listRef">
		<li
			:class="`text-center li-${index} ${getIndexClass(index)}`"
			v-for="(item, index) in skills"
			:key="`tech-${index}`">
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
  }
});

const observer = ref(null);
const listRef = ref(null);

const { animate } = toRefs(props);

const getIndexClass = (index) => {
  if (!animate.value) return "";
	const classes = [
    "text-white",
    "text-stroke stroke-teal",
    "text-teal",
		"text-stroke stroke-white",
	];
	return classes[index % classes.length] + " h2-alt animate";
};

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
</script>

<style lang="scss">
.tech {
	display: flex;
	flex-wrap: wrap;
  justify-content: center;
	gap: 2rem;

  &:not(.animated) {
    justify-content: flex-start;
    gap: .7rem;
  }

	li {
    &:not(.animate) {
      background: $redpink;
      color: $white;
      border-radius: 0.2em;
      padding: 0.2em 1em;
      @extend .paragraph;
    }
    &.animate {
      -webkit-text-stroke-width: clamp(1px, 0.035em, 2px);
      transition: opacity 0.8s ease-out;
      opacity: 0;
    }
	}

	@media (min-width: 768px) {
		@for $i from 1 to 22 {
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
</style>
