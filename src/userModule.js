
import { auth , provider , db } from './firebase'; // 引入 Firebase Auth 及 GoogleAuthProvider
import { signInWithEmailAndPassword, signOut , signInWithPopup } from 'firebase/auth';

// 匯入常用 firebase 功能
import { 
        // getFirestore, 
        // collection, 
        // addDoc , 
        doc , 
        setDoc , 
        // Timestamp , 
        // updateDoc ,
        // serverTimestamp ,
        // arrayUnion, 
        // arrayRemove ,
        // increment ,
        runTransaction ,
        // deleteField ,
        // getDoc ,
        // getDocFromCache 

} from "firebase/firestore";


// 用戶模組，MVC 結構中的 Model-Controller，都寫在 Vuex 這裡，View 寫在 Vue 組件中
const userModule = {
    state() {
        return {
            isLoggedIn: false, // 登錄狀態
            user: null, // 當前用戶，登入後自動回傳的資訊
            email: null , // 存放上次輸入資料
            password: null , // 存放上次輸入資料
            remeberMe: null , // 存放上次輸入資料
            practiceMode: true , //是否為練習模式
            userShoppingData: [] , // 使用者購物資訊
        };
    },
    // VueX Store 直接處理狀態內容的方法，都寫在這裡，外部必須透過 Action 改變狀態內容，透過 Getter 取得狀態內容
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
        // 設定使用者購物資訊
        addUserShoppingData(state,userShoppingData){
            state.userShoppingData = state.userShoppingData.concat( userShoppingData );
        },
        // 取得使用者購物資訊，注意!! 以 Email 當購物文件名稱
        async getUserShoppingData( state ,{collection_name, emailDocName }){
            // 取得使用者購物文件
            const userShoppingDoc = doc(db,collection_name , emailDocName)
            try {
                // 執行批次交易
                await runTransaction( db ,
                    async (transaction) => {
                        //取得文件物件
                        const fetchData = await transaction.get(userShoppingDoc);
                        // 文件不存在
                        if (!fetchData.exists()){
                            // 產生新資料
                            const newData = { email: emailDocName } ;
                            state.userShoppingData = newData ;
                            // 就 建立文件
                            await setDoc(
                                userShoppingDoc,  //寫入文件物件
                                newData , //寫入內容，都是 JSON 格式，或看成 JS 的物件型態
                                { merge: false } //設定為覆蓋既有文件
                            );
                            console.log( 'userModule-line-83');
                        } else {
                            // 文件存在，取得文件物件的資料內容
                            state.userShoppingData = fetchData.data() ;
                            // 讀取使用者購物資訊
                            Object.keys(state.userShoppingData).forEach(
                                key=>{ console.log('userModule-line-89', key , state.userShoppingData[key] );}
                            );
                        }
                    }
                );
            }catch( e ) {
                console.error( 'userModule-line-96 讀取客戶購物資料失敗!!',e)
            }
        },
    },
    actions: {
        // 任何 action 的第一個物件參數為 context ，通常用解構的方式使用 commit，也就是 { commit }
        // context 物件包含 {commit、dispatch、state、getters}
        // commit 用於執行 mutations，dispatch 用於執行其他 action，state 用於存取目前狀態屬性，getters 用於讀取以計算的數值

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
                console.log('userModule.line.69 載入上次登入的資料')
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
            const user = { id: 'guest' , email: 'guest@gmail.com' }
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
        // 取得使用者購物資料 (包含個人資料及訂購歷史資料)
        loadUserShoppingData({ commit },{ collection_name , emailDocName }){
            commit('getUserShoppingData' , { collection_name , emailDocName });
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
        getUShoppingData(state){
            return state.userShoppingData ;
        },
    },
};

export  default userModule  ;