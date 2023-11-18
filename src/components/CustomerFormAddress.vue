<template>
  <div class="customer-form-address">
    <v-input
      label="Страна"
      placeholder="Россия"
      v-model="$v.country.$model"
      :error="$v.country.$error"
    />
    <v-input
      label="Область"
      placeholder="Московская обл."
      v-model="$v.region.$model"
      :error="$v.region.$error"
    />
    <v-input
      label="Город"
      placeholder="Москва"
      v-model="$v.city.$model"
      :required="true"
      :error="$v.city.$error"
    />
    <v-input
      label="Улица"
      placeholder="ул. Большая Никитская"
      v-model="$v.street.$model"
      :error="$v.street.$error"
    />
    <v-input label="Дом" placeholder="1к1" v-model="$v.house.$model" :error="$v.house.$error" />
    <v-input
      label="Индекс"
      placeholder="123456"
      v-model="$v.postcode.$model"
      :error="$v.postcode.$error"
    />
  </div>
</template>

<script lang="ts">
import { required, minLength, maxLength, integer } from "vuelidate/lib/validators";
import { alphaNumRu, sentencesRU } from "@/utils";
import Vue from "vue";
import VInput from "./VInput.vue";

export default Vue.extend({
  name: "CustomerFormAddress",
  components: {
    VInput
  },
  data() {
    return {
      country: "",
      region: "",
      city: "",
      street: "",
      house: "",
      postcode: ""
    };
  },
  computed: {
    isValid(): boolean {
      return !this.$v.$invalid;
    }
  },
  watch: {
    isValid(value: boolean) {
      this.$emit("is-valid", value);
    }
  },
  validations() {
    return {
      country: {
        sentencesRU,
        minLength: minLength(4),
        maxLength: maxLength(30)
      },
      region: {
        sentencesRU,
        minLength: minLength(5),
        maxLength: maxLength(50)
      },
      city: {
        sentencesRU,
        required,
        minLength: minLength(2),
        maxLength: maxLength(40)
      },
      street: {
        sentencesRU,
        minLength: minLength(5),
        maxLength: maxLength(40)
      },
      house: {
        alphaNumRu,
        minLength: minLength(1),
        maxLength: maxLength(6)
      },
      postcode: {
        integer,
        minLength: minLength(6),
        maxLength: maxLength(6)
      }
    };
  }
});
</script>

<style lang="scss" scoped>
.customer-form-address {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
</style>
