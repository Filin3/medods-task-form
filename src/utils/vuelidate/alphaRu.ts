import { helpers } from "vuelidate/lib/validators";

export const alphaRu = helpers.regex("alphaRu", /^[а-яА-Я]+$/);
