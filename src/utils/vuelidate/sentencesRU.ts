import { helpers } from "vuelidate/lib/validators";

export const sentencesRU = helpers.regex("sentencesRU", /^[а-яА-Я.,\- ]+$/);
