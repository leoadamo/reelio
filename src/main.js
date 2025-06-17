// DEPENDENCIES
import { createApp } from "vue";
import { createPinia } from "pinia";

// COMPONENTS
import App from "./App.vue";

// ROUTER
import router from "./router";

// STYLES
import "./styles/index.css";

const pinia = createPinia();
const app = createApp(App);

app.use(router);
app.use(pinia);
app.mount("#app");
