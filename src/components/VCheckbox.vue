<template>
  <div class="v-checkbox">
    <input
      id="v-checkbox__input"
      class="v-checkbox__input"
      type="checkbox"
      :checked="value"
      @input="inputHandler"
    />
    <label
      class="v-checkbox__label"
      for="v-checkbox__input"
      :class="{ 'v-checkbox__label--checked': value }"
    >
      <span>{{ label }}</span>
      <span v-if="required" class="v-checkbox__required">*</span>
    </label>
    <span class="v-checkbox__error-message" v-if="error">{{ message }}</span>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "VCheckbox",
  props: {
    label: {
      type: String,
      required: true
    },
    value: {
      type: Boolean,
      required: true
    },
    required: {
      type: Boolean,
      default: false
    },
    error: {
      type: Boolean,
      default: false
    },
    errorMessage: String
  },
  computed: {
    message(): string {
      if (this.errorMessage) return this.errorMessage;
      return `Поле "${this.label}" обязательное`;
    }
  },
  methods: {
    inputHandler(e: Event) {
      this.$emit("input", (e.target as HTMLInputElement).checked);
    }
  }
});
</script>

<style lang="scss" scoped>
.v-checkbox {
  display: flex;
  flex-wrap: wrap;
  padding-left: 0.5rem;
  gap: 0.3rem;

  &__required {
    color: $error-color;
  }

  &__label {
    margin-left: 0.5rem;
    color: $secondary-color;
    text-decoration: line-through;

    &--checked {
      text-decoration: initial;
    }
  }

  &__error-message {
    color: $error-color;
    font-weight: bold;
    width: 100%;
  }

  &__input {
    margin: 0;
    transform: scale(1.3);
    accent-color: $primary-color;
  }
}
</style>
