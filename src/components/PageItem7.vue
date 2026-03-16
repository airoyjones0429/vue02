<template>
    <h3>BootStrap 5 表單樣式範例</h3>
    <p>表單：列樣式</p>
    <form @submit.prevent="webAPI_Validation">
        <div class="row">
            <div class="col-6">
                <input type="text" class="form-control" placeholder="輸入電子信箱" ref="email" name="email" autocomplete="email">
            </div>
            <div class="col-6">
                <input type="password" class="form-control" placeholder="輸入密碼" ref="password" name="pswd" autocomplete="current-password">
            </div>
            <button type="reset" class="btn btn-danger mt-3">清除</button>
            <button type="submit" class="btn btn-primary mt-3">送出</button>
        </div>
    </form>

    <div class="container bg-success border border-3">
        <div style="border: 5px blue solid; margin-left: 32%;margin-right: 32%;">
            <div class="btn-group-vertical w-100">
                <button type="button" class="btn btn-warning" title="設定 sessionStorage 內容1"
                @click="webAPI_session_SetAndGetItem1">Session Setting 1</button>
                <button type="button" class="btn btn-danger" title="設定 sessionStorage 內容2"
                @click="webAPI_session_SetAndGetItem2">Session Setting 2</button>
                <button type="button" class="btn btn-warning" title="列印出 sessionStorage 內容1"
                @click="webAPI_session_ConsoleLog1">Session Console Log 1</button>
                <button type="button" class="btn btn-danger" title="列印出 sessionStorage 內容2"
                @click="webAPI_session_ConsoleLog2">Session Console Log 2</button>
                <button type="button" class="btn btn-warning" title="清除所有的 sessionStorage 內容"
                @click="webAPI_session_Clear">Session Clear</button>
                <button type="button" class="btn btn-danger" title="取得 email 和 password s驗證物件內容"
                @click="webAPI_Validation"> Validation </button>
            </div>
        </div>
    </div>

    <!-- 注意!! 這裡用 :key 設定，當 change 的數值改變後，要重新刷新 UI 取回 sessionStroage 內容 -->
    <p :key="change">  {{ getSEmail() }} {{ getSPassword() }}</p>
</template>
<script>
export default {
    data(){
        return {
            email:'',
            password:'',
            remeberMe: false ,
            change: 0 ,
        };
    },
    methods:{
        webAPI_session_SetAndGetItem1(){
            sessionStorage.ssEmail = 'test@test.com' ;
            console.log( 'PageItem7.line.28 ',sessionStorage.ssEmail );
            this.change += 1 ;// 這是 :key 刷新 UI 的應用變數
        },
        webAPI_session_SetAndGetItem2(){
            sessionStorage.setItem( 'ssPassword' , '12345678' ) ;
            console.log( 'PageItem7.line.32 ',sessionStorage.getItem( 'ssPassword' ) );
            this.change += 1 ;// 這是 :key 刷新 UI 的應用變數
        },
        webAPI_session_ConsoleLog1(){
            Object.keys( sessionStorage ).forEach(
                key => {
                    console.log( `${key} ${sessionStorage[key]}` );
                }
            );
        },
        webAPI_session_ConsoleLog2(){
            for( let i = 0 ; i < sessionStorage.length ; i++){
                const key = sessionStorage.key(i) ;
                console.log( `${key}:${sessionStorage.getItem(key)}` );
            }
        },
        webAPI_session_Clear(){
            sessionStorage.clear();
            this.change= !this.change; // 這是 :key 刷新 UI 的應用變數
        },
        getSEmail(){
            console.log('PageItem7.getPassword.line.35');
            return sessionStorage.getItem('ssEmail')?sessionStorage.getItem('ssEmail'):`no data` ;
        },
        getSPassword(){
            console.log('PageItem7.getPassword.line.39');
            return sessionStorage['ssPassword']?sessionStorage['ssPassword']:`no data`;
        },
        webAPI_Validation(){
            const email = this.$refs.email ;
            const password = this.$refs.password ;

            console.log( 'PageItem7.line.75', email.validity ) ;
            console.log( 'PageItem7.line.76', password.validity ) ;

            console.log( 'PageItem7.line.75', email.validationMessage ) ;
            console.log( 'PageItem7.line.75', password.validationMessage ) ;
        }
    },
}
</script>

<!-- 
Validity Properties
The validity property of an input element contains a number of properties related to the validity of data:

Property	Description
customError	Set to true, if a custom validity message is set.
patternMismatch	Set to true, if an element's value does not match its pattern attribute.
rangeOverflow	Set to true, if an element's value is greater than its max attribute.
rangeUnderflow	Set to true, if an element's value is less than its min attribute.
stepMismatch	Set to true, if an element's value is invalid per its step attribute.
tooLong	Set to true, if an element's value exceeds its maxLength attribute.
typeMismatch	Set to true, if an element's value is invalid per its type attribute.
valueMissing	Set to true, if an element (with a required attribute) has no value.
valid	Set to true, if an element's value is valid. -->