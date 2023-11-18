import { helpers } from "vuelidate/lib/validators";

export const trafficPoliceOfficeNumber = helpers.regex(
  "trafficPoliceOfficeNumber",
  /^ГИБДД \d{4}$/
);
