<template>
	<ul
		class="tech"
		ref="listRef">
		<li
			:class="`text-center li-${index} ${getIndexClass(index)}`"
			class="paragraph"
			v-for="(item, index) in skills"
			:key="`tech-${index}`">
			<span class="h2-alt">{{ item }}</span>
		</li>
	</ul>
</template>

<script setup>
const props = defineProps({
	skills: Array,
});

const observer = ref(null);
const listRef = ref(null);

const getIndexClass = (index) => {
	const classes = [
    "text-white",
    "text-stroke stroke-teal",
    "text-teal",
		"text-stroke stroke-white",
	];
	return classes[index % classes.length];
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
	if (process.client) initObserver();
});
</script>

<style lang="scss">
.tech {
	display: flex;
	flex-wrap: wrap;
  justify-content: center;
	gap: 2rem;

	li {
		transition: opacity 0.8s ease-out;
		opacity: 0;

    &.text-stroke {
      -webkit-text-stroke-width: clamp(2px, 0.035em, 3px);
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
