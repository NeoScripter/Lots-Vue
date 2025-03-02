import Vue from 'vue';
import App from './App.vue';
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

new Vue({
  render: (h) => h(App),
}).$mount('#app');

Vue.use(VueSweetalert2);
