import Vue from "vue";
import Vuelidate from "vuelidate";
import App from "./App.vue";
import { clickOutsideDirective } from "./directives/clickOutside";

Vue.config.productionTip = false;
Vue.config.devtools = true;

Vue.use(Vuelidate);
Vue.directive("click-outside", clickOutsideDirective);

new Vue({
  render: (h) => h(App)
}).$mount("#app");
