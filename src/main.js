// DEPENDENCIES
import { createApp } from "vue";

// COMPONENTS
import App from "./App.vue";

// ROUTER
import router from "./router";

// STYLES
import "./styles/index.css";

const app = createApp(App);

app.use(router);
app.mount("#app");
