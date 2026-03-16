<template>

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
                     會自動導航到名稱路由為 ProductsList_RouteName 的位置  -->
                    <router-link :to="{ name : 'ProductsList_RouteName' }" class="nav-link" >productList</router-link>
                </li>                  
                <li class="nav-item">
                    <router-link to="/manageSystem" class="nav-link" >System</router-link>
                </li>
            </ul>
        </div>
    </nav>
    
    <div v-if="loginState==true">

        <div class="container-fluid" >
            <!-- 左側工具列按鈕 -->
            <span class="float-start">
                <!-- navbar navbar-toggler navbar-toggler-icon 這是文件影像的類別設定 -->
                <!-- <i class="bi bi-box-arrow-right"></i> 會顯示文字符號 -->
                <button class="navbar navbar-toggler rounded bi bi-box-arrow-right" type="button" data-bs-toggle="offcanvas" data-bs-target="#leftMenu"></button>
            </span>
    
            <!-- 右側工具列按鈕 -->
            <span class="float-end">
                右 隱藏功能表按鈕
                <!-- navbar navbar-toggler navbar-toggler-icon 這是文件影像的類別設定 -->
                <button class="navbar navbar-toggler navbar-toggler-icon rounded" type="button" data-bs-toggle="offcanvas" data-bs-target="#rightMenu"></button>
            </span>
        </div>
    
    
    
        <!-- 左側  隱藏  收納工具列 -->
        <div class="offcanvas offcanvas-start w-25 text-bg-dark " id="leftMenu">
            <div class="offcanvas-header">
                <h1 class="offcanvas-title">隱藏功能表標題</h1>
                <button type="button" class="btn-close" data-bs-dismiss="offcanvas"></button>
            </div>
            <div class="offcanvas-body">
                <p> 這裡可以說就像是網頁的另一個部分 </p>
                <p> w-25 設定寬度類別，設定是 25% 視窗寬度</p>
                <p> 如果有設定寬度比，文字可能會自動調整到下一列</p>
                <button class="btn btn-secondary" type="button">A Button</button>
            </div>
            <div id="div1" class="container-fluid text-bg-dark">XXX</div>
        </div>
    
        <!-- 右側  隱藏  收納工具列 offcanvas-end  -->
        <div class="offcanvas offcanvas-end text-bg-warning " id="rightMenu">
            <div class="offcanvas-header">
                <h1 class="offcanvas-title">隱藏功能表標題，打一個很長的標題</h1>
                <button type="button" class="btn-close" data-bs-dismiss="offcanvas"></button>
            </div>
            <div class="offcanvas-body">
                <p> 這裡可以說就像是網頁的另一個部分 </p>
                <p> 這個 offcanvas 沒有設定寬度</p>
                <p> 寬度固定在 399 px，但標題的字體會變大變小</p>
                <button class="btn btn-secondary" type="button">A Button</button>
            </div>
            <div id="div2" class="container-fluid text-bg-dark">XXX</div>
        </div>    
    </div>

    <div class="container">
        <!-- router-view 標籤，用來顯示路由 default 視圖 -->
        <router-view></router-view>
        
        
        <div>{{ $route.path }}</div>
        <!-- 用來顯示路由名稱為 ProductsList_RouteViewName 的視圖 -->
        <router-view name="ProductsList_RouteViewName" ></router-view>
    </div>
    
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    data(){
        return {
            loginState:false ,

        };
    },
    computed:{
        ...mapGetters(['getIsLoggedIn']),
    },
    watch:{
        getIsLoggedIn(newVal){
            this.loginState = newVal ;
        }
    }
}

</script>