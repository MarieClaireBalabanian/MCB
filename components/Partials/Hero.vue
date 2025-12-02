<template>
  <section class="project-header text-white bg-black">
    <div class="container">
      <h1
        class="h2-large mb-40"
        id="modal-title">
        {{ project.title }}
      </h1>
      <PartialsTech
        :skills="project.tech"
        class="black mb-80" />
        <NuxtLink to="/#work" class="h4 text-teal back-link" aria-label="Back to work"><span class="icon-arrow-left" aria-hidden="true">&#8617;</span>Back</NuxtLink>
    </div>
  </section>
</template>

<script setup>
  const props = defineProps({
    project: Object,
  });
</script>

<style lang="scss">
  .project-header {
    padding: 90px 0 30px;

    .tech {
      display: flex;
      flex-wrap: wrap;
    }

    .back-link {
      display: inline-flex;
      align-items: center;
      letter-spacing: 0.09em;
      border-bottom: 1px solid transparent;
      transition: border-bottom-color 0.3s ease;

      &:hover, &:focus {
        border-bottom-color: $teal;
      }
    }

    .icon-arrow-left {
      font-size: inherit;
      display: inline-block;
      margin-right: 6px;
      margin-top: 0.3em;
    }

    @media (min-width: 768px) {
      padding: 120px 0 60px;
    }
  }
</style>
