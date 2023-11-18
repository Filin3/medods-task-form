<template>
  <div class="v-select">
    <span class="v-select__label">
      <span>{{ label }}</span>
      <span v-if="required" class="v-select__required">*</span>
    </span>
    <div
      class="v-select__select-container"
      v-click-outside="clickOutsideHandler"
      :class="{
        'v-select__select-container--unwrapped': isUnWrapped && availableToSelect.length,
        'v-select__select-container--error': error
      }"
    >
      <div class="v-select__selected-items-wrapper">
        <div
          class="v-select__selected-item"
          v-for="(item, key) in value"
          :key="key"
          @click.middle="removeItem(item)"
        >
          <span>{{ item }}</span>
          <button class="v-select__selected-item-button-remove" @click.stop="removeItem(item)">
            x
          </button>
        </div>
        <input
          v-show="
            searchInput ||
            (availableToSelect.length && multiple) ||
            (availableToSelect.length && !value.length)
          "
          class="v-select__input-search"
          v-model="searchInput"
          :placeholder="availableToSelect[0]"
        />
      </div>
      <span class="v-select__arrow" :class="{ 'v-select__arrow--unwrapped': isUnWrapped }">▼</span>
      <ul
        class="v-select__list"
        :class="{
          'v-select__list--unwrapped': isUnWrapped && availableToSelect.length,
          'v-select__list--error': error
        }"
      >
        <li
          class="v-select__list-item"
          v-for="(item, key) in availableToSelect"
          :key="key"
          @click="addItem(item)"
        >
          {{ item }}
        </li>
      </ul>
    </div>
    <span class="v-select__error-message" v-if="error">{{ message }}</span>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import type { IClickOutside } from "@/type";

export default Vue.extend({
  name: "VSelect",
  props: {
    label: {
      type: String,
      required: true
    },
    data: {
      type: Array as PropType<string[]>,
      required: true
    },
    value: {
      type: Array as PropType<string[]>,
      required: true
    },
    required: {
      type: Boolean,
      default: false
    },
    multiple: {
      type: Boolean,
      default: false
    },
    error: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isUnWrapped: false,
      searchInput: ""
    };
  },
  computed: {
    message(): string {
      let result = `Поле "${this.label}" содержит недопустимое значние. Необходимо выбрать одно`;
      if (this.multiple) {
        result += " или несколько значений";
      } else {
        result += " значение";
      }
      return result;
    },
    availableToSelect(): string[] {
      return this.data.filter(
        (cur) =>
          !this.value.includes(cur) &&
          cur.toLowerCase().indexOf(this.searchInput.toLowerCase()) !== -1
      );
    }
  },
  methods: {
    addItem(item: string) {
      if (this.multiple) {
        this.$emit("input", [...this.value, item]);
      } else {
        this.$emit("input", [item]);
      }
    },
    removeItem(item: string) {
      this.$emit(
        "input",
        [...this.value].filter((cur) => cur !== item)
      );
    },
    clickOutsideHandler({ isInside }: IClickOutside) {
      this.isUnWrapped = isInside;
    }
  }
});
</script>

<style lang="scss" scoped>
.v-select {
  display: flex;
  flex-direction: column;
  color: $secondary-color;
  gap: 0.3rem;

  &__label {
    margin-left: 0.5rem;
  }

  &__required {
    color: $error-color;
  }

  &__error-message {
    margin-left: 0.5em;
    color: $error-color;
    font-weight: bold;
  }

  &__arrow {
    color: $primary-color;
    position: absolute;
    top: 5px;
    right: 8px;

    &--unwrapped {
      transform: rotate(90deg);
    }
  }

  &__select-container {
    user-select: none;
    position: relative;
    background-color: $secondary-color;
    border-radius: 0.3rem;
    border: 2px solid transparent;

    &--unwrapped {
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    }

    &--error {
      border: 2px solid $error-color;
    }
  }

  &__input-search {
    background-color: transparent;
    color: $quaternary-color;
    padding: 0.3rem;
    font-size: 1rem;
    width: 100%;

    &::placeholder {
      color: rgba($tertiary-color, 80%);
    }
  }

  &__selected-items-wrapper {
    @include overflow-scroll($primary-color);
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    padding: 0.5rem;
    max-height: 100px;
    gap: 0.3rem;
    padding-right: 25px;
  }

  &__selected-item {
    background-color: $primary-color;
    color: $quaternary-color;
    padding: 0.3rem;
    border-radius: 0.3rem;
    height: min-content;
    display: flex;
    align-items: center;
    gap: 0.2rem;

    &:hover {
      color: $quaternary-color;
      background-color: $tertiary-color;
    }

    &-button-remove {
      background-color: inherit;
      color: inherit;
      font-size: 1rem;
    }
  }

  &__list {
    @include overflow-scroll($secondary-color);
    background-color: $primary-color;
    color: $quaternary-color;
    position: absolute;
    z-index: 1;
    box-sizing: border-box;
    display: none;
    list-style: none;
    max-height: 100px;
    width: calc(100% + 4px);
    left: -2px;
    padding: 0.3rem;
    margin: 0;
    border-bottom-left-radius: 0.3rem;
    border-bottom-right-radius: 0.3rem;

    &--unwrapped {
      display: initial;
    }

    &--error {
      border: 2px solid $error-color;
      border-top: 0;
    }
  }

  &__list-item {
    width: fit-content;
    padding: 0.3rem;
    border-radius: 0.3rem;
    &:hover {
      background-color: $tertiary-color;
    }
  }
}
</style>
