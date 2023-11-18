<template>
  <div id="app">
    <customer-form />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import CustomerForm from "./components/CustomerForm.vue";

export default Vue.extend({
  name: "App",
  components: {
    CustomerForm
  }
});
</script>

<style lang="scss">
#app {
  background-color: $secondary-color;
  min-height: 100dvh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
