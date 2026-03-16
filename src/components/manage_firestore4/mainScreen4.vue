<template>
    <!-- 這是 SPA 的首頁，依靠 router-link 切換畫面，依靠 router-view 顯示視圖 -->
    <!-- 如果要使用可以收納的導覽列，就要使用下面 nav 結構 -->
    <nav class="navbar navbar-expand-sm  navbar-dark bg-dark" v-if="loginState==true"> 
        
        <!-- 設定導覽項目收納時，按鈕外觀1 -->
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar1">
            <span class="navbar-toggler-icon rounded" style="background-color: rgba(226, 224, 233, 0.788);" ></span>
        </button>

        <!-- 這裡設定導覽項目有哪些?  如果設備寬度不夠，會自動變成垂直排列的按鈕-->
        <div class="collapse navbar-collapse" id="collapsibleNavbar1">
            <ul class="navbar-nav">
                <li class="nav-item">
                    <router-link to="/" class="nav-link" v-if="this.loginState==false" >Login</router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/animals" class="nav-link" >練習一</router-link>
                </li>
                <li class="nav-item">
                    <!-- to 屬性也接受代表絕對網址的字串 -->
                    <router-link to="/food" class="nav-link" >練習二</router-link>
                </li>
                <li class="nav-item">
                    <!-- :to 也接受路由物件作為目的，這裡只有指定 name 屬性，vue-router 
                     會自動導航到名稱路由為 my-market 的位置  -->
                    <router-link :to="{ name : 'myMarket' }" class="nav-link"> 賣場首頁 </router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/manageSystem1" class="nav-link" >System</router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/memberCenter" class="nav-link" >會員中心</router-link>
                </li>
                <!-- <li class="nav-item">
                    <button class="nav-link" @click="test" >getUserShoppingData</button>
                </li> -->

            </ul>
        </div>
    </nav>
    
    <!-- 有登入，才會顯示下面內容 -->
    <div v-if="loginState==true">
        <!-- 這裡原本是放 左右二側的側邊按鈕 -->
    </div>
    
    <!-- 視圖路由都放在這裡 -->
    <div class="container">
        <!-- router-view 標籤，用來顯示路由 default 視圖 -->
        <router-view></router-view>
        
        
        <div>{{ $route.path }}</div>
        <!-- 用來顯示路由名稱為 ProductsList_RouteViewName 的視圖 -->
        <router-view name="ProductsList_RouteViewName" ></router-view>
    </div>

    <!-- 購物車圖示 -->
    <shopping-car @toggleShowCar="toggleShowCar" v-if="checkRoutePathForShoppingCar($route.path)"/>

    <div v-if="showShoppingCar==true">
        顯示購物車{{ showShoppingCar }}
        <!-- 這個命名路由與購物車明細綁定使用，所以直接在視圖引用子組件 emit 的事件 -->
        <router-view name="ShowShoppingCar" @toggleShowCar="toggleShowCar"></router-view>
    </div>
    
</template>

<script>
import { mapGetters , mapActions } from 'vuex';
import ShoppingCar from './ShoppingCar.vue';

export default {
    components:{
        ShoppingCar,
    },
    data(){
        return {
            loginState:false ,
            showShoppingCar:false,
            showOrderItemToggle:false,
        };
    },
    computed:{
        ...mapGetters(['getIsLoggedIn','currentUser','getUserShoppingData']),
    },
    watch:{
        // 監視 使用者登入狀態 登入時，改變本頁面狀態
        getIsLoggedIn(newVal){
            this.loginState = newVal ;
            this.$router.push({name:'myMarket'}); //登入到我的賣場頁面
        }
    },
    methods:{
        ...mapActions(['loadUserShoppingData']),
        toggleShowCar(){
            this.showShoppingCar = !this.showShoppingCar ;
        },
        async test(){
            // displayName、email、emailVerified、uid (Google 登入有這些屬性可能會用到)
            // 載入使用者購物資訊
            await this.loadUserShoppingData({collection_name:'userShoppingData',emailDocName: this.currentUser.email});
            // 列印使用者購物物件
            console.log( 'mainScreen4-line-145' , this.getUserShoppingData );
            console.log( 'mainScreen4-line-146',this.currentUser );
        },
        checkRoutePathForShoppingCar( routePath){
            const showPath=['/my-market','/my-market/shopping-car'] ;
            
            console.log('mainScreen4-line-111',routePath==showPath[0] , routePath==showPath[1]  );

            // 注意!!  我用陣列的方法來判斷字串是否存在，在這裡會出現像是路由不是函數的錯誤!! 
            // 所以先用麻煩的方式處理
            return routePath==showPath[0] || routePath==showPath[1];
        }
    },

}

</script>

<style>
    /* 購物車按鈕使用的類別 */
    .fixed-bottom-right {
        position: fixed;
        bottom: 20px; /* 距離底部的距離 */
        right: 20px;  /* 距離右側的距離 */
        z-index: 200;
    }
    /* 購物車新訊息使用類別 */
    .fixed-button-top {
        position: fixed;
        bottom: 39px;
        right: 18px;
        z-index: 210;
    }
    /* 滑鼠上方滑動 */
    .fixed-bottom-right:hover {
        background-color: rgba( 180,100,150 , 0.6);
    }
    

    .fixed-bottom-right:active {
        transition: background-color 0.5s ease;
        background-color: rgb(200, 228, 124);
    }    

</style>