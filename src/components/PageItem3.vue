<template>
    <!-- badge 為 BS5 徽章樣式，我用來把樣式變小，如果沒有 badge 恢復成原本正常大小 -->
    <h3>Vue 自訂標題按鈕，BootStrap5 樣式組件</h3>
    <form @submit.prevent class="input-group">
        <span class="input-group-text ">聊天：</span>
        <input type="text" class="form-control" placeholder="請輸入訊息" v-model="message">
        <button class="btn btn-outline-light bg-success badge" type="button" @click="message='abcdefghijklmnopqrstuvwxyz'">T1</button>
        <button class="btn btn-outline-light bg-success badge" type="button" @click="message='abc12345'">T2</button>
        <button class="btn btn-outline-light bg-success badge" type="button" @click="message='12345abc'">T3</button>
        <button class="btn btn-outline-light bg-success badge" type="button" @click="message='abcabc abc4abc58789abcABC'">T4</button>
        <button class="btn btn-outline-light bg-success badge" type="button" @click="message='AbcAbCABcABCaaaBC'">T5</button>
        <button class="btn btn-outline-light bg-success badge" type="button" @click="sentData">送出</button>
        <button class="btn btn-outline-light bg-danger badge" type="button" @click="clearMsg">清除</button>
    </form>
    <div style="height:50% ;background-color: blue; overflow-y:scroll;"
        @scroll="divScroll" ref="scrollTest">
        <!-- ref 為 Vue 用來快速選擇子組件的屬性 -->
        <button @click="this.$refs.scrollTest.scrollTop= 600">位移到最後</button>
        <div style="height: 200px;">
            <p>推算性屬性</p>
            {{ regExp1 }} <br>
            {{ regExp2 }} <br>
            {{ regExp2_1 }} <br>
            {{ regExp3 }} <br>
            {{ regExp4 }} <br>
            {{ regExp5 }} <br>
            {{ regExp6 }} <br>
            <br><br><br><br><br><br><br><br>

        </div>
        
    </div>
</template>

<script>
    // 選項式 API 結構
    export default {
        data(){
            return {
                message:'',// v-model 連結此屬性
            };
        },
        computed:{
            regExp1(){
                // 正則條件練習
                // 捕獲 (cde) (ijk) 字串，沒特別標明數量，就是匹配出現只有一次
                // [ab]* 代表 a b ab 空白，都會匹配
                // [fgh]* 代表 f g h fg fh gh fgh，都會匹配，注意!! 在二個出現一次的條件中間的條件，必定完整按照規則匹配
                // [lmno]* 代表 l m n o lm ln lo ...,etc
                // 正則式  處理(驗證字串內容或格式)、(依照格式取回字串)的問題
                const pattern = /[ab]*(cde)+[fgh]*(ijk)+[lmno]*/ ;
                // return pattern.exec(this.message);
                const result = this.message.match(pattern)
                
                return result;
            },
            regExp2(){
                // 匹配 abc... 的字串
                const pattern = /^abc/;
                return pattern.exec( this.message );
            },
            regExp2_1(){
                // 匹配 ....abc 的字串
                const pattern = /abc$/;
                return pattern.exec( this.message );
            },
            regExp3(){
                // 匹配 ....A1234.... 並會把 1234 四位數字 單獨儲存下來到 元素索引 1 的位置
                // \w 表示開頭一個任意字元，A 位置可以換成任何非控制字元
                // \w\d 代表第二個字元必須是數字位元
                // \w\d{4} 代表第二字元後必須連續4個數字位元
                const pattern = /\w(\d{4})/ ;
                const result = pattern.exec( this.message ) ;
                if (result){
                    console.log( result );
                    if( result[0]){console.log( result[0] );}
                    if( result[1]){console.log( result[1] );}
                }
                return result  ;
            },
            regExp4(){
                // 匹配 ...abcabc...abc.abc... 的字串
                // 並可以計算出 abc 出現的次數
                // 注意!!  必須要加上  flag  /g  才會匹配全字串內容，否則只會照到第一個
                // /i 加上後，將不同大小寫的字母，當成同一字母
                const strMatchArray = this.message.match(/abc/ig) ;
                if ( strMatchArray ){
                    // computed 推算數值，在初始化時，就會處理，如果沒有傳回值，會發生錯誤
                    // 初始化時，有些不存在的內容，可能會導致函數錯誤，所以要加條件處理
                    // 不相信的話，把 if 除掉看看
                    return `match(abc) ${ strMatchArray } ${ strMatchArray.length }`;
                }
                return null ;
            },
            regExp5(){
                // 傳回找到 ...abc... 的開始索引位置
                // 沒找到就傳回  -1
                const strSearch = this.message.search(/abc/) ;
                return `search(/abc/) ${ strSearch }`;
            },
            regExp6(){
                // replace() 無論有沒有取代，都會傳回字串內容
                // JS字串.replace( /abc/ , 'xxx' ) 只會取代，第一個 abc 字串
                // 如果有多個要 replace() 必須要用 flag /g
                const strReplace = this.message.replace(/abc/g,'!!Good Job!!') ;
                return `replace(/abc/,'!!Good Job!!') ${ strReplace }`;
            },
            
        },
        emits:['sentMessage'],
        methods:{
            clearMsg(){
                this.message='';
            },
            sentData(){
                // 將子組件內容，送到外部方法中，外部方法自行應用子組件內容
                this.$emit('sentMessage',this.message);
                this.clearMsg();
            },
            divScroll(event){
                // 列出 div 元素的 垂直卷軸位置
                // scrollTop > scrollHeight  不會錯誤，會將卷軸位移到最下面
                console.log( '.scrollTop ',event.currentTarget.scrollTop );

                console.log( '.scrollLeft',event.currentTarget.scrollLeft );
                console.log( '.scrollHeight',event.currentTarget.scrollHeight );
                console.log( '.scrollWidth',event.currentTarget.scrollWidth );
            }
        },
    }
</script>