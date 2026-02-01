<template>
    <p>使用 GoogleLogin.vue 元件檔案處理登入程序</p>
    <button @click="googleLogin" class="btn btn-success">Google 登入</button>
</template>

<script> 
import { auth , provider} from '../firebase.js'; 
import { signInWithPopup } from "firebase/auth";

// 因為要修改使用者的狀態，所以要引入 vuex 狀態管理
import { mapGetters , mapActions } from 'vuex';
 
 export default { 
    data() { 
      return { 
        currentUser: null, }; 
    },
    computed:{
      ...mapGetters(['getIsLoggedIn']),
    },
    methods: 
    { ...mapActions(['setLoginOK']),
      async googleLogin() { 
        try { const result = await signInWithPopup(auth, provider); 
          const user = result.user; // 取得使用者資訊 
          this.currentUser = { 
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          emailVerified: user.emailVerified, };
          this.setLoginOK( user ); //傳送驗證過的使用者資訊
          console.log("Google 登入成功：", this.currentUser , "mapState isLoggedIn " , this.getIsLoggedIn ); } 
        catch (error) { 
          console.error("Google 登入錯誤：", error.message); 
        } 
      }, 
    } 
  }; 
</script>