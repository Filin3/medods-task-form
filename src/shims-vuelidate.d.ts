import type Validation from "vuelidate";

declare module "vue/types/vue" {
  import Vue from "vue";

  interface Vue {
    $v: Validation;
  }
}

declare module "vue/types/options" {
  interface ComponentOptions<V extends Vue> {
    validations?: object;
  }
}
