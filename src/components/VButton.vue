<template>
  <button class="v-button">
    <slot />
  </button>
</template>

<style lang="scss" scoped>
.v-button {
  background-color: $secondary-color;
  border-radius: 0.3rem;
  min-height: 35px;
  min-width: 50px;
  padding: 0.5rem;
}
</style>
