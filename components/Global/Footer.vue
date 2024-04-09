<template>
  <footer class="bg-black text-center text-white">
    <div class="container">
      <p class="paragraph-small">&copy; {{ year }} Marie-Claire Balabanian</p>
    </div>
  </footer>
</template>

<script setup>
  const year = new Date().getFullYear();
</script>

<style lang="scss">
  footer {
    padding: 20px 0 20px;
  }
</style>