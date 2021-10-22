import Vue from 'vue';
import App from './App.vue';
import SlothImage from './sloth-image';

Vue.config.productionTip = false;
Vue.use(SlothImage);

new Vue({
  render: h => h(App)
}).$mount('#app');
