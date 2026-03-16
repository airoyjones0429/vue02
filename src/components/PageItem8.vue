<template>
    <h2>表單：堆疊樣式</h2>
    <div class="container mt-3">
        <form @submit.prevent="console.log('PageItem8.line.4')">
            <div class="mb-3 mt-3">
                <label for="email">電子信箱:</label>
                <input type="email" class="form-control" id="email" placeholder="Enter email" name="email" v-model="email" autocomplete="email">
            </div>
            <div class="mb-3">
                <label for="pwd">密碼:</label>
                <input type="password" class="form-control" id="pwd" placeholder="Enter password" name="pswd"  v-model="password" autocomplete="current-password webauthn">
            </div>
            <div class="form-check mb-3">
                <label class="form-check-label">
                    <input class="form-check-input" type="checkbox" name="remember" v-model="remeberMe" @click="console.log('PageItem8.checkbox.', remeberMe)">記住我
                </label>
            </div>
            <div class="mb-3 mt-3">
            <label for="comment">備註:</label>
            <textarea class="form-control" rows="5" id="comment" name="text" placeholder="請輸入備註內容"></textarea>
            </div>
            <button type="submit" class="btn btn-primary">送出</button>
        </form>
    </div>

    <!-- 下面是垂直群組按鈕的 BS5 格式 -->
    <div class="container bg-danger">
        <div style=" margin-left: 28%;margin-right: 28%;">
            <div class="btn-group-vertical">
                <button type="button" class="btn btn-warning" title="列印出 localStorage 儲存的資料"
                @click="webAPI_LocalStorage">Web API LocalStorage Console Log</button>
                
                <button type="button" class="btn btn-success" title="列印出 localStorage 屬性名稱"
                @click="webAPI_LocalStorage_key">Console Log Keys</button>
                
                <button type="button" class="btn btn-warning" title="移除 localStorage 屬性"
                @click="webAPI_LocalStorage_removeItem1">Web API LocalStorage Remove Item</button>
            
                <button type="button" class="btn btn-success" title="移除 localStorage 屬性"
                @click="webAPI_LocalStorage_removeItem2">Web API LocalStorage Remove Item</button>
            
                <button type="button" class="btn btn-warning" title="設定並列出 localStorage 屬性及資料內容"
                @click="webAPI_LocalStorage_SetAndGetItem1">Web API LocalStorage SetAndGetItem1</button>
            
                <button type="button" class="btn btn-success" title="設定並列出 localStorage 屬性及資料內容"
                @click="webAPI_LocalStorage_SetAndGetItem2">Web API LocalStorage SetAndGetItem2</button>
            </div>    
        </div>
    </div>

</template>
<script>
export default {
    data(){
        return {
            email:'',
            password:'',
            remeberMe: false ,
        };
    },
    created(){
        // 元素建立儲存空間後，可以開始處理資料

        // 抓取上次儲存在瀏覽器的登入資訊
        this.email = localStorage['email'] ? localStorage['email']  : '' ;
        this.password = localStorage['password'] ? localStorage['password']  : '' ;
        this.remeberMe = localStorage['remeberMe'] ? localStorage['remeberMe']  : '' ;
    }
    ,
    methods:{
        // localStorage .clear() 清除所有 localStorage 內容
        // localStorage .key() 傳回第 n 個 key 名稱
        webAPI_LocalStorage(){
            console.log( 'PageItem8.line.32.列出目前瀏覽器儲存的所有內容',localStorage );
            Object.keys( localStorage ).forEach(
                key => {
                    console.log(`${key} : ${localStorage[key]}  ${typeof localStorage[key] }`);
                }
            );
        },
        webAPI_LocalStorage_SetAndGetItem1(){
            localStorage.newProperty1 = 'test1' ;
            console.log( 'PageItem8.line.57', localStorage.newProperty1 );
        },
        webAPI_LocalStorage_SetAndGetItem2(){
            localStorage.setItem('newProperty2' , 2000 ) // 最後會自動以 '2000' 儲存起來
            console.log( 'PageItem8.line.57', localStorage.getItem('newProperty2') );
        },
        webAPI_LocalStorage_removeItem1(){
            // 刪除物件屬性方法，也能處理 localStorage 物件
            delete localStorage.newProperty1 ;
            delete localStorage.newProperty2 ;
        },
        webAPI_LocalStorage_removeItem2(){
            // 刪除物件屬性方法，也能處理 localStorage 物件
            localStorage.removeItem('newProperty1') ;
            localStorage.removeItem('newProperty2') ;
        },
        webAPI_LocalStorage_key(){
            console.log('start list localStorage Properties');
            for( let i = 0 ; i < localStorage.length ; i++){
                console.log(localStorage.key(i)) ;
            }
            console.log('end ===');
        },

    },
}

</script>