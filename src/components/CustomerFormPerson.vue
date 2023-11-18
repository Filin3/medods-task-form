<template>
  <div class="customer-form-person">
    <v-input
      label="Имя"
      placeholder="Иван"
      v-model="$v.name.$model"
      :required="true"
      :error="$v.name.$error"
    />
    <v-input
      label="Фамилия"
      placeholder="Иванов"
      v-model="$v.secondName.$model"
      :required="true"
      :error="$v.secondName.$error"
    />
    <v-input
      label="Отчество"
      placeholder="Иванович"
      v-model="$v.patronymic.$model"
      :error="$v.patronymic.$error"
    />
    <v-input
      type="date"
      label="Дата рождения"
      v-model="$v.dateOfBirth.$model"
      :required="true"
      :error="$v.dateOfBirth.$error"
    />
    <v-select label="Пол" v-model="gender" :data="['Мужской', 'Женский']" />
    <v-input
      type="number"
      label="Номер телефона"
      placeholder="79123456789"
      v-model="$v.phone.$model"
      :required="true"
      :error="$v.phone.$error"
    />
    <v-checkbox label="Не отправлять СМС" v-model="sendSMS" />
  </div>
</template>

<script lang="ts">
import { required, minLength, maxLength } from "vuelidate/lib/validators";
import { alphaRu, phone } from "@/utils";
import Vue from "vue";
import VInput from "./VInput.vue";
import VCheckbox from "./VCheckbox.vue";
import VSelect from "./VSelect.vue";

export default Vue.extend({
  name: "CustomerFormPerson",
  components: {
    VInput,
    VCheckbox,
    VSelect
  },
  data() {
    return {
      name: "",
      secondName: "",
      patronymic: "",
      dateOfBirth: "",
      gender: [] as string[],
      phone: "",
      sendSMS: false
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
      name: {
        required,
        alphaRu,
        minLength: minLength(2),
        maxLength: maxLength(30)
      },
      secondName: {
        required,
        alphaRu,
        minLength: minLength(2),
        maxLength: maxLength(30)
      },
      patronymic: {
        alphaRu,
        minLength: minLength(2),
        maxLength: maxLength(30)
      },
      dateOfBirth: {
        required,
        maxValue: (value: string) => new Date(value) <= new Date()
      },
      phone: {
        required,
        phone
      }
    };
  }
});
</script>

<style lang="scss" scoped>
.customer-form-person {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
</style>
