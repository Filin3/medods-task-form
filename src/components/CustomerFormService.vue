<template>
  <div class="customer-form-service">
    <v-select
      label="Группа клиентов"
      v-model="$v.selectedClientStatuses.$model"
      :required="true"
      :multiple="true"
      :data="availableClientStatuses"
      :error="$v.selectedClientStatuses.$error"
    />
    <v-select label="Лечащий врач" v-model="selectedDoctors" :data="availableDoctors" />
  </div>
</template>

<script lang="ts">
import { required } from "vuelidate/lib/validators";
import Vue from "vue";
import VSelect from "./VSelect.vue";

export default Vue.extend({
  name: "CustomerFormPerson",
  components: {
    VSelect
  },
  data() {
    return {
      availableClientStatuses: ["VIP", "Проблемные", "ОМС"],
      availableDoctors: ["Иванов", "Захаров", "Чернышева"],
      selectedClientStatuses: [] as string[],
      selectedDoctors: [] as string[]
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
      selectedClientStatuses: {
        required
      }
    };
  }
});
</script>

<style lang="scss" scoped>
.customer-form-service {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
</style>
