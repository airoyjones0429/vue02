<template>
    <div :id="id" class="container bg-light">
        <h3>組件 id 為 {{ id }}</h3>
        <p>JavaScript 正則查詢 與 輸入介面 練習</p>
        <!-- v-html 可以將含有 HTML 標籤的字串，以 HTML 效果顯示出來 -->
        <p v-html="webContent" style="text-wrap-style: balance;"></p>
        
        <form @submit.prevent="formHandler">
            <!-- pattern {3} 代表 3 個字元長度，{3,6} 代表 3 ~ 6 字元長度都接受 -->
            <input type="text" placeholder="請輸要查詢的字串" v-model="strFind" name="strFind"
            pattern="[^A-Z]{3}" title="請輸入剛好 3 個字元" required>
            <!-- 注意!! 這裡沒有用 @click.prevent 會觸發 submit 事件 -->
            <button @click.prevent="test1">測試</button>
            <p>輸入方塊 pattern 條件測試</p>
            <input type="text" placeholder="請輸要查詢的字串" v-model="strFind1" name="strFind1"
            pattern="[^A-Z]{1,}" title="請輸入至少 1 個字元" required>
            <input type="submit" value="送出表單資料">
        </form>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                // \u0057  這是用 Unicode 編碼表的半形字元 W 
                // 顏文字笑臉 1F600 (HTML 直接使用 &#x1F600 )
                // 笑臉 1F600 用 JS 表示 必須用二組 \u 組合而成，分為高低碼點
                // 高碼點範圍 D800 ~ DBFF，所以轉換後數值，要加上 D800
                // 低碼點範圍 DC00 ~ DFFF，所以轉換後數值，要加上 DC00
                // 計算前處理 x1F600 數值，去掉 x10000 的部分，留下 xF600，依照規則，就可轉換成JS可用的高低碼
                // 高碼點計算為 F600 >> 10，右移 10 次，補 0 湊成 16 bit ，會是 0000 0000 0011 1101 == x003D，最後加上 D800，變為 xD83D
                // 低碼點計算為 xF600 & x03FF， F AND 0 == 0，6 AND 3 == 2， 00 AND FF == 00，結果為 x0200，最後加上 DC00，變為 xDE00
                // 這樣之後就可以直接用連續的 /uD83D/uDE00 代表笑臉
                webContent: 'abcＡＢＣ123defg 456h ijk7 lmn\\fodef pq8r stuv9\uD83D\uDE00wxdef yzabc1 23defg456hijk7lmnopdefq8rstuv9wxyz' ,//要匹配的字串
                strFind: '' ,//要查詢的字串
                strFind1: '' ,//要查詢的字串
            };
        },
        props:['id'],
        methods:{
            // submit() 事件，會隱含傳送 event 物件，直接用 event 就可以使用
            formHandler(){
                //保留原本字串
                let pString = this.webContent ;
                // 清除字串中的 <span>、</span> 字串，注意!! 必須要有 /g 不然只會處理第一個項目
                this.webContent =pString.replace( /<[/]?span>/g,'');                

                this.process1( this.strFind );
                this.process1( this.strFind1 );
            },
            process1( strRegExp  ){
                //保留原本字串
                let pString = this.webContent ;
                
                // RegExp( 規則字串 , 正則旗號)
                const pattern = new RegExp( strRegExp ) ;
                // String.match( )
                // Matches a string with a regular expression, 
                // and returns an array containing the results of that search.
                
                // query1.index 在有查詢結果時，這會傳回字串開始位置，從 0 開始
                // .slice( 開始索引位置 , 結束索引位置 ) 這是字串的切片方法
                const query1 = pString.match( pattern ) ;
                // 如果有匹配字串結果，就用標籤標記起來
                if ( query1 ) {
                    //添加 HTML 標籤
                    let tagSPAN =`<span>${query1[0]}</span>` ;
                    // 取 符合條件 前字串、後字串
                    const startString = pString.slice( 0 , query1.index ) ;
                    const endString = pString.slice( query1.index + query1[0].length) ; 
                    this.webContent = `${startString}${tagSPAN}${endString}`;
                }
            },
            test1(){
                // 注意!!  /(def)/g  才能判斷有幾個 def 字串
                const pattern = /(def)/g ;                
                const r1 = pattern.exec(this.webContent)   ;
                console.log( `PageItem1.line.65.傳回目前結果的開始${r1.index}及最後${pattern.lastIndex}索引位置`);

                // 只有 test() 可以迴圈判斷  每個  def 的結束索引編號
                while( pattern.test(this.webContent)){
                    console.log( 'PageItem1.line.74', pattern.lastIndex);
                }                
            },
        },
    }
</script>
<style>
    p:hover{
        animation-name: aniBgColor ;
        animation-duration: 1s;
        animation-direction: alternate-reverse;
        animation-iteration-count: infinite;
    }

    p>span {
        background-color: rgba( 0 , 255, 0, 0.5);
        font-size: x-large;
    }

    /* 兄弟 span */
    span+span{
        background-color: rgba(80, 80, 80, 0.5);
    }

    /* 父子 span */
    span>span{
        background-color: rgba(255 , 255 , 0.5);
    }    

    @keyframes aniBgColor {
        0% { background-color: rgba( 255 , 0 , 0 , 0.5) ;}
        50% { background-color: rgba(0 , 0, 255, 0.8) ;}
        100% { background-color: rgba(192, 192, 0 , 0.5) ;}
    }
    

</style>