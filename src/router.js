// 使用 vue-router ，需要使用下指令安裝
// npm  install  vue-router
import { createRouter, createWebHistory } from 'vue-router'

// Vue-Router 會做下面工作：
// 全域注册 RouterView 和 RouterLink 组件。
// 全域添加 $router 和 $route 属性。
// 啟用 useRouter() 和 useRoute() 组合式函数。
// 觸發路由器解析初始路由。

// 以狀態來管理視圖路由時，這裡需要引用 Vuex 狀態管理
import store from './store' ;

// 引入 子組件藍圖
import FoodItems from './components/FoodItems.vue'
import AnimalCollection from './components/AnimalCollection.vue'
// eslint-disable-next-line
import LoginScreen from './components/LoginScreen.vue'
import DocList3 from './components/manage_firestore3/DocList3.vue';
import DocList4 from './components/manage_firestore4/DocList4.vue';
import ProductsList from './components/manage_firestore3/ProductsList.vue';
// eslint-disable-next-line
import LoginScreen3 from './components/manage_firestore3/LoginScreen3.vue';
import LoginScreen4 from './components/manage_firestore4/LoginScreen4.vue';
import ProductsList4 from './components/manage_firestore4/ProductsList4.vue';
import ShoppingDetail from './components/manage_firestore4/ShoppingDetail.vue';
import MemberCenter from './components/manage_firestore4/memberCenter.vue';


// 建立路由物件陣列
// 內部物件格式為 path 代表路由名稱，component 代表該路由視圖，所要呈現的 Vue 組件
const routes = [
    // { path: '/',  component: LoginScreen },
    // { path: '/',  component: LoginScreen , redirect: {name:'newLogin'} }, // redirect 接受絕對位址 或 命名路由物件{name: route_name} //1150317 改為註解
    { path: '/animals', component: AnimalCollection },
    { path: '/food', component: FoodItems },
    { path: '/manageSystem' , component: DocList3 },
    // 下面故意在 components 中，只設定一個視圖組件，且命名視圖名稱為 ProductsList_RouteViewName 指定 ProductsList 組件為視圖組件
    // 若沒有指定 default 視圖，這樣會造成 default 的視圖位置空白，並不會出現錯誤訊息
    { path: '/productList' ,name: 'ProductsList_RouteName', components: { default : DocList3 , ProductsList_RouteViewName : ProductsList} },

    // 因保留改版歷程，所以使用 redirect 轉址，!! 注意  導航守衛要增加條件
    // { path: '/login' , name : 'newLogin' , component: LoginScreen3 ,redirect:{name:'newLogin1'}}, //1150317 改為註解
    

    // 以下為 manage_firestore4 目錄使用路由
    // { path: '/login1' , name : 'newLogin1' , component: LoginScreen4 },//1150317 改為註解
    { path: '/' , name : 'newLogin1' , component: LoginScreen4 },//1150317 改為註解
    { path: '/my-market' , name : 'myMarket' , component: ProductsList4 },
    { path: '/my-market/shopping-car' , name : 'shoppingCar' , components: { default:ProductsList4 ,ShowShoppingCar:ShoppingDetail} },
    { path: '/manageSystem1' , component: DocList4 },
    { path: '/memberCenter' , component: MemberCenter },
    
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

    // 沒有登入  且  目的地不是重定向頁面 (!!避免無窮重定項)
    if (  to.path !== '/' && to.name !== 'newLogin' && to.name !== 'newLogin1' && !isLoggedIn  ) {
        console.log('router.js Line.33: Please login !');
        next('/'); // 重定向到登錄頁面
    } else {
        next(); // 允許訪問
    }
});

export default router ;