export function scrollTo(id, motion) {
  const el = document.getElementById(id);
  if (el) {
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 60, behavior: motion })
    el.focus({
      preventScroll: true // prevents clash with smooth scroll
    });
  }
}