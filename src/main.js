import { createApp, markRaw } from 'vue'
import { Quasar, Notify, AppFullscreen, AddressbarColor, Cookies } from 'quasar'
import {createPinia} from "pinia"
import router from "./router/routes";
import './index.css'
// Import icon libraries
import '@quasar/extras/material-icons/material-icons.css'
import '@quasar/extras/fontawesome-v6/fontawesome-v6.css'
// Import Maz-UI CSS 
import 'maz-ui/css/main.css'
// Import Quasar css
import 'quasar/src/css/index.sass'

// Assumes your root component is App.vue
// and placed in same folder as main.js
import App from './App.vue'

const myApp = createApp(App);
const pinia = createPinia();

pinia.use(({ store }) => {
    store.$router = markRaw(router)
  });

myApp.use(Quasar, {
  plugins: {
    Notify,
    AppFullscreen,
    AddressbarColor,
    Cookies
  }, // import Quasar plugins and add here
  config: {
    
  }
})



myApp.use(router);
myApp.use(pinia);

myApp.mount('#app')
