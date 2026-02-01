<template>
    <div class="container mt-5 bg-warning">
        <!-- 這個 row 負責登入介面大小控制，當登入後，不再顯示內部的路由視圖 -->
        <div class="row">
            <div class="col-sm-2 col-lg-3 col-xl-4 col-xxl-5"></div>
            <div class="col-sm-8 col-lg-6 col-xl-4 col-xxl-3">
                <p>請選擇下面這幾個路由</p>
                <p>沒有登入時，無法進入 Animals、Food</p>
                <router-link to="/" class="btn btn-primary" v-if="this.loginState==false" >Login</router-link>
                <router-link to="/animals" class="btn btn-primary" >Animals</router-link>
                <router-link to="/food" class="btn btn-primary" >Food</router-link><br>
                <div v-if="this.loginState==false" >
                    <router-view></router-view>
                </div>
            </div>
            <div class="col-sm-2 col-lg-3 col-xl-4 col-xxl-5" >
                <p v-if="practiceMode==true"> {{ loginState? '不顯示':'顯示' }}登入路由</p>
            </div>         
        </div>
        <!-- 這裡開始負責登入後的路由視圖 -->
        <div v-if="this.loginState==true">
            <router-view></router-view>
        </div>   

    </div>
</template>
<script>

import { mapGetters } from 'vuex'
// import {  mapState } from 'vuex'  // 這個我還不會使用

export default {
    data(){
        return {
            loginState:false,
            practiceMode: true , //是否為練習模式            
        }
    },
    computed:{
        // 透過 vuex 直接讀取 store.js 的 state.isLoggedIn 狀態
        ...mapGetters(['getIsLoggedIn']),
        ...mapGetters(['getPracticMode']),
    },
    watch:{
        // 監視 vuex getIsLoggedIn狀態，當狀態改變時，改變組件內建狀態
        getIsLoggedIn(newVal,oldVal){
            console.log('mainScreen Line.41' , oldVal);
            this.loginState = newVal ;
        },
        loginState(newVal,oldVal){ //監視組件內建狀態 loginState，當狀態為 true 時，自動跳到路由 /animals
            console.log('mainScreen Line.45' , newVal , oldVal );
            if(newVal){
                this.$router.push('/animals');
            }
        },
        getPracticMode(newVal,oldVal){
            console.log('mainScreen Line.48' , newVal , oldVal );
            this.practiceMode = newVal ;
        },
    },
}

</script>