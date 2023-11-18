import { helpers } from "vuelidate/lib/validators";

export const phone = helpers.regex("phone", /^7\d{10}$/);
