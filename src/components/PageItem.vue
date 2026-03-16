<template>
    <div :id="id">
        <h3>{{ id }}</h3>
        <p>JavaScript 正則 .test() 練習 {{ stringID }}</p>
        <button @click="stringTest1='Peter'">Peter</button>
        <button @click="stringTest1='Apple'">Apple</button>
        <button @click="stringTest1='Teacher'">Teacher</button>
        <button @click="stringTest1='Special'">Special</button>
        <button @click="stringTest1='Super'">Super</button>
        <button @click="stringTest1='Beautiful'">Beautiful</button>        
        
        <p>尋找 ter 字串式，<span>【{{ regExp1 ? '有':'沒' }}】</span>字串</p>
    
        <p>依照自己設定的字串，查詢結果</p>
        <input title="" type="text" placeholder="輸入要查詢的字串" v-model="sortString" pattern="[a-zA-Z]{3,}">
        <p>尋找 {{ sortString }} 字串式，<span>【{{ regExp2 ? '有':'沒' }}】</span>字串</p>
        
        <p>增加一組條件，並查詢結果</p>
        <input type="text" placeholder="增加符合的條件" v-model="sortString1" pattern="[a-zA-Z]{3,}">
        <p>尋找 {{ sortString }} 或 {{ sortString1 }} 字串，<span>【{{ regExp3 ? '有':'沒' }}】</span>字串</p>
    </div>

    
</template>

<script>
    export default {
        data(){
            return{
                sortString:'ter',//測試用條件1
                sortString1:'', //測試用條件2
                stringTest1:'', //被測試的字串 暫存區
                patternCheck:false ,//輸入字元強制修正檢查使用
            };
        },
        watch:{
            // 練習使用一個方法，同時處理二個參數的 watch 監看式
            sortString(newVal,oldVal){
                console.log(newVal,oldVal);
                //注意!! 這裡觸發自己重複修改自己的遞迴，借用另一個記號變數，讓這裡不會連續執行
                //若失敗，馬上出現類似無窮迴圈的錯誤
                this.sortString = this.checkInputBox( newVal , oldVal);
            },
            sortString1(newVal,oldVal){
                console.log(newVal,oldVal);
                //注意!! 這裡觸發自己重複修改自己的遞迴，借用另一個記號變數，讓這裡不會連續執行
                //若失敗，馬上出現類似無窮迴圈的錯誤
                this.sortString1 = this.checkInputBox( newVal , oldVal);
            },
        },
        props:['id'],
        computed:{
            // 根據 id 推算出 stringID 內容
            stringID(){
                let strName ;
                    // /.../g  正則表達式 ... 這部分要輸入篩選條件
                    // \d 選擇數字， + 選擇字元 1 個以上
                    strName = /\d+/g.exec( this.id )[0] ;             
                return strName ;
            },
            // 直接使用正則表示式，篩選字串是否出現
            regExp1(){
                const patternRegEx = /ter/;
                return patternRegEx.test(this.stringTest1);
            },
            // 使用 new RegExp() 創建以 JS 變數控制的正則條件
            regExp2(){
                const patternRegEx = new RegExp( this.sortString ) ;
                return patternRegEx.test( this.stringTest1 );
            },
            regExp3(){
                const patternRegEx1 = new RegExp( `${this.sortString}` ) ;
                const patternRegEx2 = new RegExp( `${this.sortString1}` ) ;
                
                return patternRegEx1.test( this.stringTest1) || patternRegEx2.test( this.stringTest1);
            },

        },
        methods:{
            // 輸入字串檢查
            checkInputBox(newVal,oldVal){
                const patternRegEx = /[^a-zA-Z]+/g ;
                const m1 = newVal.match(patternRegEx);
                console.log('PageItem.line.37 m1 = ',m1); // 找到不是 [a-zA-Z] 範圍的 + 1個或多個連續字元，m1 就不會是 null

                // 沒找到錯誤字元 或 上次已經檢查並復原字串 時，初始化字串檢查記號
                if(!m1 || this.patternCheck){
                    //正常的字串
                    this.patternCheck=false;
                    return newVal;
                }else{
                    // 避免遞迴設定
                    this.patternCheck=true;
                    return oldVal;
                }

            }
        }
    }
</script>
<style scoped>
    p{
        animation-name: aniBgColor ;
        animation-duration: 10s;
        animation-direction: alternate-reverse;
        animation-iteration-count: infinite;
    }

    p>span{
        background-color: rgba( 0 , 255, 0, 0.5);
        font-size: x-large;
    }

    @keyframes aniBgColor {
        0% { background-color: rgba( 255 , 0 , 0 , 0.5) ;}
        40% { background-color: rgba( 0 , 255, 0, 0.8) ;}
        50% { background-color: rgba(0 , 0, 255, 0.5) ;}
        60% { background-color: rgba(255, 255, 0, 0.8) ;}
        70% { background-color: rgba(0, 255, 255, 0.5) ;}
        80% { background-color: rgba(255, 0,255, 0.8) ;}
        90% { background-color: rgba(192, 192, 0.5) ;}
        100% { background-color: rgba(0,255, 255, 0.8) ;}
    }
    

</style>