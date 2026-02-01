// 使用 vue-router ，需要使用下指令安裝
// npm  install  vue-router
import { createRouter, createWebHistory } from 'vue-router'

// 以狀態來管理視圖路由時，這裡需要引用 Vuex 狀態管理
import store from './store' ;

// 引入 子組件藍圖
import FoodItems from './components/FoodItems.vue'
import AnimalCollection from './components/AnimalCollection.vue'
import LoginScreen from './components/LoginScreen.vue'

// 建立路由物件陣列
const routes = [
    { path: '/', component: LoginScreen },
    { path: '/animals', component: AnimalCollection },
    { path: '/food', component: FoodItems },
];

// 建立 vue-router 路由管理物件
const router = createRouter({
    history: createWebHistory(),
    routes,
});

// 設置路由守衛
// to 代表目的路由，next
router.beforeEach((to, from, next) => {
    const isLoggedIn = store.getters.getIsLoggedIn; // 獲取 Vuex 狀態管理器的 登入狀態屬性
    console.log('main.js line 35' , to );
    console.log('main.js line 36' , from );
    if ((to.path === '/food' || to.path === '/animals') && !isLoggedIn) {
        console.log('router.js Line.33: Please login !');
        next('/'); // 重定向到登錄頁面
    } else {
        next(); // 允許訪問
    }
});

export default router ;