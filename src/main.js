// 引入 Vue3 的 createApp() 方法，創建主組件實體
// 使用下面指令安裝 vue
// npm  install  -g  @vue/cli
import { createApp } from 'vue'

// 引入 store.js，使用 Vuex 狀態管理模組
import store from './store' 

// 引入 router.js，使用 Vue-Router 視圖路由管理
import router from './router'

// 引入 主組件藍圖
import App from './App.vue'

// 引入 子組件藍圖
import MainScreen from './components/mainScreen.vue'
import GoogleLogin from './components/GoogleLogin.vue'
import CarItems from './components/CarItems.vue'
import ProductItems from './components/ProductItems.vue'
import DocList from './components/manage_firestore/DocList.vue'
import DocList1 from './components/manage_firestore1/DocList1.vue'

// 建立 vue 應用App
const app = createApp(App)

// 在 App 實例中，標籤化子組件，這裡是全域註冊，如果註冊太多，會影響效能
app.component('main-screen',MainScreen);
app.component('google-login' ,GoogleLogin);
app.component('car-items' , CarItems);
app.component('product-items',ProductItems);
app.component('doc-list',DocList);
app.component('doc-list1',DocList1);

app.use(store); // 這個 app 使用 Vuex store

app.use(router);// 這個 app 使用 Vue-Router

app.mount('#app') // 掛載到網頁 id="app" 的容器中