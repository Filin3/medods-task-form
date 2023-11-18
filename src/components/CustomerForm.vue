<template>
  <div class="customer-form">
    <customer-form-person v-if="stage === 1" @is-valid="isValidHandler" />
    <customer-form-document v-else-if="stage === 2" @is-valid="isValidHandler" />
    <customer-form-address v-else-if="stage === 3" @is-valid="isValidHandler" />
    <customer-form-service v-else-if="stage === 4" @is-valid="isValidHandler" />
    <span v-else class="customer-form__success-message">Новый клиент успешно создан</span>
    <div class="customer-form__button-wrapper">
      <v-button :disabled="!isValid && stage != maxStage" @click.native="changeStage">
        {{ stage === maxStage ? "Ок" : "Далее" }}
      </v-button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import VButton from "./VButton.vue";
import CustomerFormPerson from "./CustomerFormPerson.vue";
import CustomerFormDocument from "./CustomerFormDocument.vue";
import CustomerFormAddress from "./CustomerFormAddress.vue";
import CustomerFormService from "./CustomerFormService.vue";

export default Vue.extend({
  name: "CustomerForm",
  components: {
    VButton,
    CustomerFormPerson,
    CustomerFormDocument,
    CustomerFormAddress,
    CustomerFormService
  },
  data() {
    return {
      stage: 1,
      maxStage: 5,
      isValid: false
    };
  },
  methods: {
    isValidHandler(value: boolean) {
      this.isValid = value;
    },
    changeStage() {
      if (this.stage === this.maxStage) {
        this.stage = 1;
      } else {
        this.stage++;
      }
      this.isValid = false;
    }
  }
});
</script>

<style lang="scss" scoped>
.customer-form {
  width: 400px;
  display: flex;
  flex-direction: column;
  background-color: $tertiary-color;
  padding: 2rem;
  margin: 1rem;
  border-radius: 1rem;

  &__button-wrapper {
    margin-top: 1rem;
    display: flex;
    justify-content: flex-end;
  }

  &__success-message {
    text-align: center;
    font-size: 1.5rem;
    color: $secondary-color;
  }
}
</style>
