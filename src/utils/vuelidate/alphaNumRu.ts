import { helpers } from "vuelidate/lib/validators";

export const alphaNumRu = helpers.regex("alphaNumRu", /^[а-яА-Я0-9]+$/);
