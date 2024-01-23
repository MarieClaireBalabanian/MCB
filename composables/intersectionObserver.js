const options = {
	threshold: 0.5,
};
const animateOnScrollObserver = new IntersectionObserver((entries, animateOnScrollObserver) => {
	entries.forEach((entry) => {
		if (entry.isIntersecting) {
			entry.target.classList.remove('v-aos-before-enter');
			entry.target.classList.add('v-aos-entered');
		} else {
			entry.target.classList.remove('v-aos-entered');
			entry.target.classList.add('v-aos-before-enter');
		}
	});
}, options);

export default defineNuxtPlugin((nuxtApp) => {
	nuxtApp.vueApp.directive('aos', {
		mounted(el) {
			el.classList.add('v-aos');
			el.classList.add('v-aos-before-enter');
			animateOnScrollObserver.observe(el);
		},
	});
});