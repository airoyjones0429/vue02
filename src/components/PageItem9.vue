<template>
    <!-- 
        表單的驗證 Validation of form
        有效性物件 validity 
        input 為 required 時，自動會有錯誤偵測，強制使用者要輸入，所以 validity.valueMissing 可能沒用
        input 有 pattern 屬性時，已經會自動驗證有效性，所以 validity.patternMismatch 可能沒用
        pattern="^(?=.*[a-z])(?=.*[A-Z])[A-Za-z]+$"  必須有小寫與大寫英文的正則
        pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[A-Za-z0-9]+$" 必須要有大小寫及數字的正則
        注意!!  聲明 x(?=y) 的 () 沒有捕獲功能，所以 (?=y) 都當作條件看，
        而 []+ 代表其內字元可以出現一次以上，但是沒綁定條件，條件由前面的 (?=y) 決定

        pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[#$%^&])[A-Za-z0-9#$%^&]+$"  這是加上部分符號

        正則條件式中，的控制符號，依樣必須用 \ 跳脫字元排除， AI 有的並不會教你處理

        如果正則有錯誤，會發現，所有錯誤碼都能輸入 !! 這是很嚴重的錯誤!!

        可以輸入{}符號，但是要用  \{\}  才行，不然正則會失效!!
        下面會檢查 是否有輸入一次 !@#$%^&*()+=-
        pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\!\@\#\$\%\^\!\@\#\$\%\^\&\*\{\}\[\]\|\\\/\.\?\,\;\:\(\)\=\+\-])[A-Za-z0-9\!\@\#\$\%\^\&\{\}\[\]\|\\\/\.\?\,\;\:\(\)\=\+\-']+$"
     
        幾乎所有的驗證機制，都直接在元素層面強制要求，目前還沒想到如何才能用到 validity API 物件
    -->
    <div :style="{
            'background-color': bgColor?bgColor:'#ffffff' ,
            'color'  :bgColor?  getColor(bgColor) :'#000000'
        }">
        <form @submit.prevent="checkValidity">
            <h4>BS5 input-group 將標籤、輸入、按鈕組合在一起</h4>
            <div class="input-group">
                <span class="input-group-text">標題名稱</span>
                <input :type="passwordMode?'password':'text'" 
                class="form-control form-control-plaintext border-bottom" name="account"
                ref="account" required 
                pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\!\@\#\$\%\^\!\@\#\$\%\^\&\*\{\}\[\]\|\\\/\.\?\,\;\:\(\)\=\+\-])[A-Za-z0-9\!\@\#\$\%\^\&\{\}\[\]\|\\\/\.\?\,\;\:\(\)\=\+\-\*']+$"
                autocomplete="name"
                placeholder="請輸入資料" title="浮動說明欄位">

                <!-- 下面用來控制密碼是否顯示 -->
                <button @click="passwordMode=!passwordMode">
                    <!-- 下面是 bootstrap 5 的 文字影像類別，上網可以查的到 -->
                    <i :class="{'bi bi-eye' : !passwordMode , 'bi-eye-slash' : passwordMode }"></i>
                </button>                

                <!-- minlength maxlength 直接在表單輸入時，就會檢查、限制 -->
                <input :type="passwordMode?'password':'text'" placeholder="請輸入10個以上字元"
                class="form-control"
                autocomplete="number"
                name="account1" ref="account1"
                minlength="10">

                <input :type="passwordMode?'password':'text'" placeholder="請輸入10個以下字元"
                class="form-control"
                autocomplete="number"
                name="account2" ref="account2"
                maxlength="10">
            </div>

            <div class="input-group">
                <!-- min max 在表單中，已經有驗證效果 -->
                <label for="number1" class="input-group-text">數值：</label>
                <input class="form-control" id="number1" type="number" min="0" max="500" autocomplete="number"><br>
    
                <!-- 設定顏色輸入  value="#CCCCCC"-->
                <!-- 下面 label 加上 for="myColor" 屬性，就可以看到調色盤.... -->
                <label  class="input-group-text">Color picker</label>
                <input type="color" class="form-control form-control-color"
                title="Choose a color" v-model="bgColor">

            </div>


            <input type="submit" value="送出資料"><span>{{ msgErr1 }}</span>


        </form>

    </div>

</template>
<script>
    export default {
        data(){
            return {
                bgColor: null ,
                passwordMode:true,
                msgErr1:'測試錯誤資訊',
            };
        },
        methods:{
            checkValidity(){
                const account1 = this.$refs.account1 ;
                const account2 = this.$refs.account2 ;
                const accValidity1 = account1.validity ;
                const accValidity2 = account2.validity ;
                console.log( 'PageItem9.line.24', accValidity1 , accValidity2 , this.bgColor );
            },
            getColor( color ){
                // console.log('PageItem9.line.94.color',color ,typeof color); //String
                // 將 RGB 分組分開抓回來
                let pattern = /#(\w\w)(\w\w)(\w\w)/
                let chgColor = pattern.exec( color ); // 這裡會得到 4 個元素 0:匹配的完整字串 1:RR 2:GG 3:BB
                // console.log('PageItem9.line.94.color', chgColor , typeof chgColor); //Object
                return  `#${chgColor[3]>'88'?'00':'EE'}${chgColor[2]>'88'?'00':'AA'}${chgColor[1]}` ;
            }
        },
    }

</script>