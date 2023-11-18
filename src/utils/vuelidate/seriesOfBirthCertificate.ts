import { helpers } from "vuelidate/lib/validators";

export const seriesOfBirthCertificate = helpers.regex(
  "seriesOfBirthCertificate",
  /^[IVX]*-[А-Я]{2}$/
);
