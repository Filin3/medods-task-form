<template>
  <div class="v-input">
    <label class="v-input__label" for="v-input__input">
      <span>{{ label }}</span>
      <span v-if="required" class="v-input__required">*</span>
    </label>
    <input
      id="v-input__input"
      class="v-input__input"
      :class="{ 'v-input__input--error': error }"
      :type="type"
      :placeholder="placeholder"
      :value="value"
      @input="inputHandler"
    />
    <span class="v-input__error-message" v-if="error">{{ message }}</span>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "VInput",
  props: {
    label: {
      type: String,
      required: true
    },
    value: {
      required: true
    },
    placeholder: {
      type: String,
      default: ""
    },
    type: {
      type: String,
      default: "text"
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

      let result = "";
      if (this.type.toLowerCase() === "date") {
        result = `Поле "${this.label}" содержит недопустимое значение`;
      } else {
        result = `Поле "${this.label}" содержит недопустимое значение. Пример допустимого значения: ${this.placeholder}`;
      }
      return result;
    }
  },
  methods: {
    inputHandler(e: Event) {
      this.$emit("input", (e.target as HTMLInputElement).value);
    }
  }
});
</script>

<style lang="scss" scoped>
.v-input {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 0.3rem;

  &__required {
    color: $error-color;
  }

  &__label {
    margin-left: 0.5rem;
    color: $secondary-color;
  }

  &__error-message {
    margin-left: 0.5em;
    color: $error-color;
    font-weight: bold;
    width: 100%;
  }

  &__input {
    min-height: 1.5rem;
    padding: 0.2rem 0.5rem 0.2rem 0.5rem;
    border-radius: 0.3rem;
    background-color: $secondary-color;
    color: $quaternary-color;
    border: 2px solid transparent;

    &--error {
      border: 2px solid $error-color;
    }

    &::placeholder {
      color: rgba($quaternary-color, 70%);
    }
  }
}
</style>
