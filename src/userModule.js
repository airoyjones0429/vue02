
import { auth , provider } from './firebase'; // 引入 Firebase Auth 及 GoogleAuthProvider
import { signInWithEmailAndPassword, signOut , signInWithPopup } from 'firebase/auth';


// 用戶模組，MVC 結構中的 Model-Controller，都寫在 Vuex 這裡，View 寫在 Vue 組件中
const userModule = {
    state() {
        return {
            isLoggedIn: false, // 登錄狀態
            user: null, // 當前用戶
            email: null , // 存放上次輸入資料
            password: null , // 存放上次輸入資料
            remeberMe: null , // 存放上次輸入資料
            practiceMode: true , //是否為練習模式
        };
    },
    mutations: {
        // 設定登入使用者資訊
        setUser(state, user) {
            console.log( 'store.js line.22 user =>' , user );
            state.user = user; // 設置用戶
            state.isLoggedIn = !!user; // 更新登錄狀態
        },
        // 改變 email 及 password 狀態值的方法
        setEmailAndPassword(state, {email , password , remeberMe } ){
            console.log( 'store.js line.27 email =>' , email , password , remeberMe);
            state.email = email ;
            state.password = password ;
            state.remeberMe = remeberMe ;
        },
        // 設定練習模式狀態
        setPracticMode(state,practiceMode){
            state.practiceMode = practiceMode ;
        },
    },
    actions: {
        // 注意，{ } 大括號內，是具名宣告，引用方法時需指定參數名稱，若參數名稱與引入變數名稱相同時，不用具名指定，否則要具名指定，如：{ email: var1 , password:var2 }
        
        // 使用 login() 登入，需要提供 email、及 password 資訊，根據 firebase 授權物件判斷是否正確，若正確，傳回使用者資訊
        // 使用 email、password 登入，必須要先註冊為目前 App 的會員，才能使用
        async login({ commit }, { email, password ,remeberMe}) {
            try {
                console.log( 'store.js line.32 email=> ', email ,' pwd=> ' , password)
                if ( remeberMe ){ // rememberMe 為真，代表要儲存目前登入資訊
                    console.log('store.js 44 RemeberMe is true')
                    localStorage.setItem('email', email); // 儲存到本地儲存
                    localStorage.setItem('password', password); // 儲存到本地儲存
                    localStorage.setItem('remeberMe', remeberMe); // 儲存到本地儲存
                } else {
                    console.log('store.js 49 RemeberMe is false')
                    localStorage.removeItem('email'); // 清除本地儲存
                    localStorage.removeItem('password'); // 清除本地儲存
                    localStorage.removeItem('remeberMe'); // 清除本地儲存
                }
                const userCredential = await signInWithEmailAndPassword(auth, email, password);
                commit('setUser', userCredential.user); // 設置用戶
            } catch (error) {
                console.error("Login error:", error); // 錯誤處理
            }
        },
        // 載入上次登入的 email 及 password 資料
        loadEmailAndPassword({ commit }) {
            const savedEmail = localStorage.getItem('email');
            const savedPassword = localStorage.getItem('password');
            const savedRememberMe = localStorage.getItem('remeberMe');
            console.log( 'store.line 58',savedEmail , savedPassword , savedRememberMe  );
            if (!!savedEmail && !!savedPassword ) {
                console.log('store.js ')
                commit('setEmailAndPassword', { email: savedEmail , password: savedPassword , remeberMe: savedRememberMe});
            }
        },        

        // 使用 loginWithGoogle() 登入，直接使用 Google授權提供者來處理登入問題
        // 使用 Google 登入，不用先註冊為 App 會員，就可直接使用
        async loginWithGoogle({ commit }) {
            try {
                const userCredential = await signInWithPopup(auth, provider);
                commit('setUser', userCredential.user); // 設置用戶
            } catch (error) {
                console.error("Google login error:", error); // 錯誤處理
            }
        },
        // 登出 logout() 方法，將 firebase 授權物件 auth 內登入資訊清除
        async logout({ commit }) {
            try {
                await signOut(auth);
                commit('setUser', null); // 清除用戶
            } catch (error) {
                console.error("Logout error:", error); // 錯誤處理
            }
        },
        offLineLogin({commit} , {account , password} ){
            const user = { id: 'guest' }
            try {
                if (account == 'guest@gmail.com' && password == '123456' )
                    commit('setUser', user );
                else {
                    throw('off-line password or account wrong');
                }
            } catch (error){
                console.error("Logout error:", error); // 錯誤處理
            }
        },
        // 改變練習狀態的動作
        changePracticMode({commit} , {practiceMode}){
            commit('setPracticMode',practiceMode);
        },

        // 改變狀態為登入狀態，利用外部驗證
        setLoginOK({commit} , user){
            commit('setUser', user); // 設置用戶
        },
    },
    getters: {
        getIsLoggedIn(state) {
            return state.isLoggedIn; // 獲取登錄狀態
        },
        currentUser(state) {
            return state.user; // 獲取當前用戶
        },
        getBeforeEmailAndPassword(state) {
            return { email: state.email , password: state.password  , remeberMe: state.remeberMe}
        },
        getPracticMode(state){ // 取得練習模式狀態
            return state.practiceMode ;
        },
    },
};

export  default userModule  ;