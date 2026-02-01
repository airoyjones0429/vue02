<template>
    <!-- 登入畫面面板 -->


    <!-- BS5 切換按鈕樣式 -->
    <div class="form-check form-switch">
      <input class="form-check-input" type="checkbox" 
            id="mySwitch" name="darkmode" value="yes" 
            @click="practiceMode=!practiceMode" checked>
      <label class="form-check-label" for="mySwitch">切換練習模式</label>
    </div>

    <form @submit.prevent="console.log( 'At LoginScreen.vue Line.2' , this.getIsLoggedIn , ' user' , this.currentUser )" >
        <div class="mb-3 mt-3">
            <label for="email">電子信箱:</label>
            <input type="email" class="form-control" id="email" placeholder="Enter email" name="email" v-model="email" >
        </div>
        <div class="mb-3">
            <label for="pwd">密碼:</label>
            <input type="password" class="form-control" id="pwd" placeholder="Enter password" name="pswd" v-model="password">
        </div>
        <div class="form-check mb-3">
            <label class="form-check-label">
                <input class="form-check-input" type="checkbox" name="remember"  v-model="remeberMe" >記住我
            </label>
        </div>
        <button type="submit" class="btn btn-warning" v-if="practiceMode">submit</button>
        <!-- 注意下面，Action 用的是具名引數方式傳遞參數，所以當傳遞參數變數名稱與目的具名引數名稱相同時，不用特別指定 { email , password } 也是可動作的 -->
        <button @click="login( { email: email, password: password , remeberMe } )" class="btn btn-primary me-2">登入</button>
        <button @click="logout" class="btn btn-success me-2">登出</button>
        <hr>
        <google-login/>
        <br>
        <hr v-if="practiceMode">
        <button @click="loginWithGoogle" class="btn btn-success" v-if="practiceMode">Google登入 (用 VuexStore 處理)</button><br>
        <button @click="offLineLogin( {account:email , password })" class="btn btn-success" v-if="practiceMode">離線登入</button><br>
        <button @click="console.log( this.getBeforeEmailAndPassword )" class="btn btn-success" v-if="practiceMode">取得上次登入資訊</button><br>

    </form>
    <button @click="fetchProducts" v-if="practiceMode">抓取產品資料</button>
    <p v-if="practiceMode" > {{ productCount }}</p>
</template>
<script>
// 狀態動作函數 mapActions()、狀態屬性取得函數 mapGetters()
import { mapActions , mapGetters } from 'vuex';
export default {
    data(){
        return {
            email: '' ,
            password: '',
            remeberMe: false ,
            practiceMode: true , //練習模式
        }
    } ,
    watch:{
        practiceMode(newVal,oldVal){
            console.log('LoginScreen line.54 ', newVal ,'to', oldVal);
            this.changePracticMode({practiceMode:newVal});
        }
    },
    methods:{
        //使用 store.js 當作 Vuex 狀態管理檔案
        ...mapActions(['login','loadEmailAndPassword']) ,
        ...mapActions(['changePracticMode']),
        ...mapActions(['logout']) ,
        ...mapActions(['loginWithGoogle']),
        ...mapActions(['offLineLogin']),
        ...mapActions(['fetchProducts']),
    },
    computed: {
        // mapGetters() 放在 computed 才能直接用 this.isLoggedIn 讀取狀態值，放在 data() 不會有正常的效果
        ...mapGetters(['getIsLoggedIn']),
        ...mapGetters(['currentUser']),
        ...mapGetters(['productCount']),
        ...mapGetters(['getBeforeEmailAndPassword']),
    },
    created(){
        this.loadEmailAndPassword() ; // 載入上次登入資訊
        const { email , password , remeberMe } = this.getBeforeEmailAndPassword ; //取回上次登入資訊
        this.email = email ;
        this.password = password ;
        this.remeberMe =  remeberMe ;
        console.log('loginScreen.vue Line.61' , email , password , remeberMe);
    },
}

</script>