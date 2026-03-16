<template>

    <!-- 下拉式登入輸入介面，會是下面的結構 -->
    <!-- 
      class="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown"  主要容器應設定項目
         class="dropdown-menu"       顯示成下拉式菜單應設定項目
             class="dropdown-item"   下拉式項目1 應 設定項目  有設定會有 :hover 及預設樣式效果
             class="dropdown-item"   下拉式項目2 應 設定項目  沒設定就沒 :hover 樣式效果
             class="dropdown-item"   下拉式項目3 應 設定項目
    -->
    <top-item4>
        
        <div style="width: 200px;margin: 20% auto ;position: relative;">
            <div class="spaceHeight" ></div>
            <div class="w-100">
                <button @click="loginWithGoogle" class="btn btn-primary me-2 w-100"> Google 註冊登入</button>    
    
                <div class="my-3 btn-group w-100">
                    <button type="button" class="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown">
                    E-Mail 登入
                    </button>
                    <!-- <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="#">Tablet</a></li>
                    <li><a class="dropdown-item" href="#">Smartphone</a></li>
                    </ul> -->
                    <form @submit.prevent="printMsg" class="dropdown-menu bg-warning" style="width: 300px;">
                        <div class="mx-3 my-3 ">
                            <label for="email">電子信箱:</label>
                            <input type="email" class="form-control" id="email" placeholder="請輸入 Email" name="email" v-model="email" autocomplete="username" >
                        </div>
                        <div class="mx-3 my-3">
                            <label for="pwd">密碼:</label>
                            <input type="password" class="form-control" id="pwd" placeholder="請輸入密碼" name="pswd" v-model="password" autocomplete="current-password">
                        </div>
                        <div class="mx-3 my-3 form-check d-flex justify-content-between">
                            <label class="form-check-label my-1">
                                <input class="form-check-input" type="checkbox" name="remember"  v-model="remeberMe" >記住我
                            </label>
                            <button @click="login( { email: email, password: password , remeberMe } )" class="btn btn-primary me-2">登入</button>
                        </div>

                        <div type="button" class="btn btn-outline-secondary" @click="offLineLogin({account: 'guest@gmail.com', password: '123456'})">
                            OFF-Line Login
                        </div>
                        
                        
                    </form>
                </div>               
                
            </div>
            <img @click="getWidthSize( $event)" :src="webLogoPNG" class="logo rounded-pill"
             alt="webLogo" style="" 
             ref="webLogo"
            >
        </div>
    </top-item4>
    
</template>

<script>
import { mapActions , mapGetters } from 'vuex';
import { myFirebaseCollection , myCollectionDoc , getData , images} from '../../myCollection';
import TopItem4 from './TopItem4.vue';
    export default {
        components:{
            TopItem4,
        },
        data(){
            return {
                email: null ,
                password: null ,
                remeberMe: false ,
                webLogoPNG: images.webLogoLogin,
            };
        },
        methods:{
            // VueX 登入動作 login，載入上次的登入資料 loadEmailAndPassword
            ...mapActions(['login','loadEmailAndPassword']) ,
            // VueX 登出動作 logout，用 Google 註冊並登入
            ...mapActions(['logout','loginWithGoogle']) ,
            // VueX 抓取產品資料
            ...mapActions(['fetchProductsFromFirebase']),
            // 離線登入
            ...mapActions(['offLineLogin']),
            // 測試
            printMsg(){
                console.log(
                    this.email ,
                    this.password ,
                    this.remeberMe
                );
            },
            getWidthSize( event ){
                const e = event.target ;
                console.log( '元素寬度',e.clientWidth ,
                '元素高度', e.clientHeight ) ;

            }                 
        },
        computed: {
            // mapGetters() 放在 computed:{} 中
            ...mapGetters(['getIsLoggedIn']),
            ...mapGetters(['getProduction']),
            ...mapGetters(['getBeforeEmailAndPassword']),
            

        },
        async created(){       
            this.loadEmailAndPassword() ; // 載入上次登入資訊
            const { email , password , remeberMe } = this.getBeforeEmailAndPassword ; //取回上次登入資訊
            this.email = email ;
            this.password = password ;
            this.remeberMe =  remeberMe ;

            // 持續檢查產品資料是否有資料
            console.log('LoginScreen3.line.115');
            getData(50 ).then((data) => {
                // 用欄位當作資料筆數，所以計算欄位長度
                console.log('資料數量:', Object.keys(data).length );
            }).catch((error) => {
                console.error('發生錯誤:', error);
            });
            console.log('LoginScreen3.line.122');
            
            // 提取產品資料回本機
            await this.fetchProductsFromFirebase( { collection_name: myFirebaseCollection  , document_name:myCollectionDoc.product1 } );

        },
    }

</script>
<style scoped>
    .spaceHeight{
        @media (min-width: 1200px) { /* 執行到最小寬度為 1201 px */
            height: 330px;
        }

        @media (max-width: 1201px) { /* 執行到最大寬度為 1200 px */
            height: 360px;
        }
        @media (max-width: 991px) { /* 執行到最大寬度為 767 px */
            height: 320px;
        }        
        @media (max-width: 768px) { /* 執行到最大寬度為 767 px */
            height: 370px;
        }
        @media (max-width: 576px) { /* 執行到最大寬度為 576 px */
            height: 390px;
        }
        @media (max-width: 500px) { /* 執行到最大寬度為 400 px */
            height: 390px;
        }
        @media (max-width: 460px) { /* 執行到最大寬度為 400 px */
            height: 390px;
        }
        @media (max-width: 360px) { /* 執行到最大寬度為 400 px */
            height: 380px;
        }        
        
    }

    .logo {
        position: absolute;
        @media (min-width: 1200px) { /* 執行到最小寬度為 1200 px */
            --logo-image-height: 220px ;
            --logo-image-width: 900px ;
            --logo-image-left: -356px ;
            --logo-image-top: 40px;
        }                 
        @media (max-width: 1201px) { /* 大於寬度為 1201 的設備不執行內容 */
            --logo-image-height: 250px ;
            --logo-image-width: 600px ;
            --logo-image-left: -190px ;
            --logo-image-top: 60px;
        }
        @media (max-width: 991px) { /* 大於寬度為 768 的設備不執行內容 */
            --logo-image-height: 140px ;
            --logo-image-width: 400px ;
            --logo-image-left: -100px ;
            --logo-image-top: 150px;            
        }                    
        @media (max-width: 768px) { /* 大於寬度為 768 的設備不執行內容 */
            --logo-image-height: 140px ;
            --logo-image-width: 400px ;
            --logo-image-left: -100px ;
            --logo-image-top: 200px;            
        }            
        @media (max-width: 576px) { /* 大於寬度為 576 的設備不執行內容 */
            --logo-image-height: 140px ;
            --logo-image-width: 400px ;
            --logo-image-left: -100px ;
            --logo-image-top: 200px;            
        }
        @media (max-width: 500px) { /* 大於寬度為 400 的設備不執行內容 */
            --logo-image-height: 120px ;
            --logo-image-width: 360px ;
            --logo-image-left: -80px ;
            --logo-image-top: 200px;
        }

        @media (max-width: 460px) { /* 大於寬度為 400 的設備不執行內容 */
            --logo-image-height: 100px ;
            --logo-image-width: 300px ;
            --logo-image-left: -50px ;
            --logo-image-top: 240px;
        }

        @media (max-width: 360px) { /* 大於寬度為 400 的設備不執行內容 */
            --logo-image-height: 80px ;
            --logo-image-width: 260px ;
            --logo-image-left: -30px ;
            --logo-image-top: 260px;            
        }  

        left: var(--logo-image-left) ;
        top: var(--logo-image-top);
        width: var(--logo-image-width);
        height: var(--logo-image-height);
    }

</style>