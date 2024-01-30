<template>
  <footer role="contentinfo">
    <div class="container text-center">
      <p class="paragraph-small text-white">&copy; {{ year }} Marie-Claire Balabanian</p>
    </div>
  </footer>
</template>

<script setup>
  const year = new Date().getFullYear();
</script>

<style lang="scss">
  footer {
    padding: 20px 0 20px;
    background: $black;
  }
</style>