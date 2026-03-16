<template>
<div class="container-fluid" title="BootStrap5 & HTML 練習區域"
    style="background-color: rgb(112, 112, 112);">

        <!-- 自動標順序的項目標籤 組件化-->
        <ol-list id="ol1"
        v-for="data in dataList" :key="data" :list-type="'ol'"
        :list-title="data.title" :list-item="data.list"
        :treeNumber="1" titleBGControl="1" />

        <!-- 沒有順序的項目標籤  組件化-->
        <ul-list  titleBGControl="1" id="ul1"
        v-for="data in vueSkillList" :key="data"
        :list-title="data.title" :list-item="data.list" 
        :treeNumber="1"
        />

        <!-- 沒有順序的項目標籤  組件化-->
        <ul-list  titleBGControl="1" id="ul2"
        v-for="data in regExpSkill" :key="data"
        :list-title="data.title" :list-item="data.list" 
        :treeNumber="1"
        />



        <!-- 注意!! 下面會是二層的頁籤 因為有二組 class="nav nav-tabs text-bg-info" BS5 CSS Class -->
        <!-- 注意!  class="tab-content" 是顯示分頁的位置，也可以不只一個 -->

        <!-- 這裡的分頁的按鈕大小，會隨著文字長度而變長 -->
        <ul class="nav nav-tabs text-bg-info">
            <li class="nav-item">
                <a class="nav-link active" data-bs-toggle="tab" href="#h1">正則練習1</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" data-bs-toggle="tab" href="#h2">正則練習2</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" data-bs-toggle="tab" href="#h3">垂直卷軸練習</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" data-bs-toggle="tab" href="#h4">標題輸入按鈕</a>
            </li>
        </ul>

        <!-- 上分頁內容區塊 -->
        <div class="tab-content">
            <!-- 注意!!  下面的 active 會讓這個 div 顯示出來，fade 則會隱藏 -->
            <div id="h1" class="container tab-pane active text-dark">
                <page-item id="pageItem1" />
            </div>
            <div id="h2" class="container tab-pane fade"><br>
                <page-item1 id="pageItem2" />
            </div>
            <div id="h3" class="container tab-pane fade" style="height: 500px;"><br>
                <page-item2/>
            </div>

            <!-- Vue 用 : (v-bind) 連接屬性，用 @ (v-on:) 連接事件 -->
            <div id="h4" class="container tab-pane fade"><br>
                <page-item3 @sentMessage="( msg )=> console.log( 'Fooditems.line.58',msg )" />
            </div>

        </div>


        <!-- 這裡的分頁的按鈕寬度會相等  下分頁  -->
        <ul class="nav nav-tabs text-bg-info nav-justified">
            <li class="nav-item">
                <a class="nav-link active" data-bs-toggle="tab" href="#h5">標題-輸入 範例</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" data-bs-toggle="tab" href="#h6">常用物件1</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" data-bs-toggle="tab" href="#h7">常用物件2</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" data-bs-toggle="tab" href="#h8">表單範例1</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" data-bs-toggle="tab" href="#h9">表單範例2</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" data-bs-toggle="tab" href="#h10">表單驗證</a>
            </li>            
            
        </ul>

        <!-- 下分頁面板內容區塊 -->
        <div class="tab-content">
            <div id="h5" class="container tab-pane active "><br>
                <page-item4 />
            </div>            

            <div id="h6" class="container tab-pane fade"><br>
                <page-item5 />
            </div>
            <div id="h7" class="container tab-pane fade text-bg-info"><br>
                <page-item6 />
            </div>
            <div id="h8" class="container tab-pane fade"><br>
                <page-item7 />       
            </div>
            <div id="h9" class="container tab-pane fade" style="width: 500px;"><br>
                <page-item8 />
            </div>
            <div id="h10" class="container tab-pane fade"><br>
                <page-item9 />
            </div>
        </div>
    </div>

</template>

<script>
    import OlList from './OlList.vue';
    import UlList from './UlList.vue';
    import PageItem from './PageItem.vue';
    import PageItem1 from './PageItem1.vue';
    import PageItem2 from './PageItem2.vue';
    import PageItem3 from './PageItem3.vue';
    import PageItem4 from './PageItem4.vue';
    import PageItem5 from './PageItem5.vue';
    import PageItem6 from './PageItem6.vue';
    import PageItem7 from './PageItem7.vue';
    import PageItem8 from './PageItem8.vue';
    import PageItem9 from './PageItem9.vue';
    export default {
        components:{
            UlList , OlList , PageItem , PageItem1,
            PageItem2, PageItem3 , PageItem4 ,
            PageItem5 , PageItem6 , PageItem7 ,
            PageItem8 , PageItem9
        },
        data(){
            return {
                upDiv:1, // 顯示上排標籤內容
                dataList:[
                    {
                        title:'前端框架種類：',
                        list:[
                            'React：目前最受歡迎的前端框架之一，擁有大量的社區支持和生態系統。',
                            'Vue：在開發者中非常受歡迎，特別適合中小型項目，並且學習曲線相對平緩。',
                            'Angular：適合大型應用，雖然學習曲線較陡，但提供了全面的解決方案。',
                            'Svelte：近年來逐漸受到關注，因其簡潔的語法和高效的性能而受到開發者喜愛。',
                            'Ember.js：雖然使用者相對較少，但在大型應用開發中仍然有其獨特的優勢。',
                            'Backbone.js：儘管現在的使用率較低，但曾經是許多項目的選擇，適合需要靈活性的開發。',
                        ],
                    },
                    {
                        title: 'Vue 的特色及優勢：',
                        list:[
                            '響應式數據綁定：Vue 的響應式系統可以自動更新視圖，當數據改變時，相關的 DOM 會自動重新渲染。',
                            '組件化架構：Vue 鼓勵使用組件來構建應用，這使得代碼更易於維護和重用。',
                            '虛擬 DOM：Vue 使用虛擬 DOM 來提高性能，通過最小化對實際 DOM 的操作來加快渲染速度',
                            '簡單易學：Vue 的語法簡單，對於新手來說，學習曲線相對平緩，易於上手。',
                            '靈活性：Vue 可以用於構建單頁應用（SPA）或用於現有項目的增強，並且可以與其他庫或框架一起使用。',
                            '性能優越：由於使用虛擬 DOM 和高效的渲染機制，Vue 在性能上表現出色，適合構建大型應用。',
                            '靈活的開發模式：Vue 支持多種開發模式，包括模板語法、JSX 和渲染函數，開發者可以根據需求選擇合適的方式。',
                            '強大的生態系統：Vue 的生態系統包括 Vue Router（路由管理）、Vuex（狀態管理）等，這些工具使得開發大型應用變得更加容易。',
                        ],
                    }
                ],
                vueSkillList:[
                    {
                        title: 'Vue 指令',
                        list:[
                            'v-bind：Connects an attribute in an HTML tag to a data variable inside the Vue instance.',
                            'v-on：Connects an event on an HTML tag to a JavaScript expression or a Vue instance method.',
                            'v-if：Creates HTML tags depending on a condition. Directives v-else-if and v-else are used together with the v-if directive.',
                            'v-show：Specifies if an HTML element should be visible or not depending on a condition.',
                            'v-for：Creates a list of tags based on an array in the Vue instance using a for-loop.',
                            'v-model：Used in HTML forms with tags like <form>, <input> and <button>. Creates a two way binding between an input element and a Vue instance data property.',
                        ]
                    },
                    {
                        title: 'Vue 結構(選項式API)' ,
                        list: [
                            '組件預設屬性：data(){...return{ key1:value1,key2:value2,...,.,.}; } 設定組件基本屬性資料及初始值',
                            '組件互動方法：methods:{...} 設定組件內部事件方法',
                            '推導性屬性：computed:{...} 根據屬性資料計算出新數據，可直接用方法名稱讀取傳回值，當相依的屬性改變時，會重新計算數據',
                            '屬性監看：watch:{...}，監看指定屬性 ( data、props、mapGetter )，當內容改變時，會觸發 watch 程序，要避免觀測屬性，在觀測程序中發生持續無法停止的內容變化，例如觀測後自己增加1，這樣會觸發下次的觀測。',
                            '組件外部安插屬性：props:[.,.,.,]，提供自訂屬性名稱陣列，或 props:{ ...,propName:{},..., } 定義自訂屬性物件',
                            '組件輸出事件陣列：emits:[]，設定組件可被觸發的事件名稱，這讓組件的事件有明確交代的統一位置，非必要，但可增加文件可維護性。',
                            '組件可引用屬性：expose:[]，封裝此組件並暴露陣列中指定的屬性、方法名稱，不在暴露陣列中的屬性及方法，都無法用 $refs 物件存取',
                            'expose 補充：如果組件沒有封裝，則所有屬性及方法，都可用 $refs 物件存取',
                        ]
                    },
                    {
                        title: 'Vue 組件生命週期觸發事件 Hook' ,
                        list: [
                            'What is hook?：組件的創建過程是連續環環相扣的，每個事件勾著下一個事件，環環相扣，所以有 HOOK 的名稱',
                            'beforeCreate：當組件初始化時觸發',
                            'created：組件初始化完成時觸發，這是可以設定組件狀態內容',
                            'beforeMount：組件掛載前觸發，這裡不能處理 DOM ',
                            'mounted：組件已經掛載時觸發，可以處理 DOM',
                            'beforeUpdate：組件偵測到需要重新渲染物件，但還沒渲染前，觸發',
                            'updated：組件已經重新渲染過後，觸發',
                            'beforeUnmount：組件要從 DOM 樹中，移除前觸發',
                            'unmounted：組件從 DOM 樹中移除後觸發',                            
                            'activated：快取動態組件加載後觸發，動態組件仍在 DOM 樹中',
                            'deactivated：快取動態組件移除後觸發，動態組件仍在 DOM 樹中',
                            'serverPrefetch：Server-Side Rendering 專用 Hook',
                        ]                        

                    },

                    {
                        title:'',
                        list:[

                        ],
                    },


                ],
                javaScriptSkill:[
                    {
                        title: 'JavaScript Validation API 驗證 DOM 資料內容用 API',
                        list:[
                            '',
                            '',
                        ]
                    },
                    {
                        title: 'JavaScript Web API 【Application Programming Interface】' ,
                        list:[
                            '【Local Storage】 localStorage 儲存在瀏覽器中，關閉瀏覽器，資料依然存在：\
                              儲存資料使用 .setItem( "name" , value )：\
                              取得資料使用 .getItem( "name" ) 就會傳回讀取內容：\
                              使用 localStorage["name"] 也可以讀取內容 ',
                            '【Session Storage】 sessionStorage 只在目前的瀏覽器儲存，關閉瀏覽器，資料就被清除：\
                              存取方式與【Local Storage】相同',
                            'Web Storage API 皆有下列方法： .length .key() .setItem() .getItem .removeItem() .clear()',
                            'localStorage.length：傳回目前已經儲存幾筆資料',
                            'localStorage.key(n)：傳回索引為 n 的 key 名稱，並非該 key 內容：或許，使用 Object.keys(localStorage).forEach(){} 會比較方便',
                            'localStorage.setItem( strName , strValue )：設定 strName 屬性內容為 strValue：localStorage[strName] = strValue 這樣也可以：localStorage.strName = strValue 也可以',
                            'localStorage.getItem( strName )：取回 strName 屬性的內容：可以直接用 localStorage[strName] 或 localStorage.strName 也有相同效果',
                            'localStorage.removeItem( strName )：移除 strName 這個屬性項目：delete localStorage.strName 這樣也可以刪除物件屬性',
                            'localStorage.clear()：清除所有瀏覽器 localStorage 離線的資料',
                        ],
                    }
                ],
                regExpSkill:[
                    {
                        title:'正則字串用途與對應方法',
                        list:[
                            '搜尋字串：JS字串變數.search(regexp)：傳回符合條件，"第一個"字串的起始索引位置。',
                            '替換字串：JS字串變數.replace(regexp, s)：傳回取代後的新字串內容。',
                            '替換字串：JS字串變數.replaceAll(regexp, s)：傳回取代後的新字串內容。',
                            
                            '驗證字串：JS字串變數.match(regexp)：符合規則傳回匹配的物件，並依照規則分解字串，將內容存放在物件中，否則傳回 null。',
                            '驗證字串：JS字串變數.matchAll(regexp)：傳回符合規則的迭代物件。',
                        ]
                    },
                    {
                        title: '正則表示式 RegExp 旗標 Flag 【旗標可以一起搭配使用!!】' ,
                        list: [
                            '旗標 /d：執行子字串匹配 matches：使用方式：new RegExp("regexp","d") 或：直接使用 /regexp/d 表示',
                            '旗標 /g：執行全字串匹配，傳回所有匹配結果，沒有用/g，結果與用 exec() 一樣，只傳回第一個匹配的結果：使用方式：new RegExp("regexp","g") 或：直接使用 /regexp/g 表示',
                            '旗標 /i：執行不考慮大小寫字母的匹配：使用方式：new RegExp("regexp","i") 或：直接使用 /regexp/i 表示',
                            '旗標 /m：執行 "多行" 字串匹配，使用時會影響 ^(起始符號) 與 $(結尾符號) 的特性，改為在每列的開頭與結尾匹配',
                            '旗標 /s：允許用 . 點，來代替匹配 \\n 換行字元：使用方式：new RegExp("regexp","s") 或：直接使用 /regexp/s 表示',
                            '旗標 /u：允許匹配 Unicode 字串：使用方式：new RegExp("regexp","u") 或：直接使用 /regexp/u 表示',
                            '旗標 /v： /u 的升級版本，注意!! /u 與 /v 不可一起使用：使用方式：new RegExp("regexp","v") 或：直接使用 /regexp/v 表示',

                            '旗標 /y：允許使用 pattern.lastIndex 設定搜尋字串起始位置，如果沒有 /y ，設定 .lastIndex 屬性也沒效果：使用方式：new RegExp("regexp","y") 或：直接使用 /regexp/v 表示',

                        ]
                    },
                    {
                        title: '正則表示式【物件方法與用途】',
                        list: [
                            '驗證字串：/RegExp/.test(JS字串)：符合測試條件傳回真，否則假。',
                            '驗證字串：/RegExp/.exec(JS字串)：傳回匹配結果陣列或 null',
                            '設定查詢起始位置：注意!! 旗號必須為包含 /y：使用方式：/RegExp/y.lastIndex = JS字串索引數值 ',
                            '傳回匹配結果的結束索引：執行一次匹配後，用 /RegExp/.lastIndex 就可以讀出數值，與 .lastIndex - .index 會等於搜尋字串長度 ',
                            '轉譯文字：需要先自訂替代字串：假設是 const strChange = RegExp.escape("[==]")，之後用 const regEx = new RegExp(strChange,\'g\') 產生正則物件：之後，用JS字串.replace() 方法，就可以將文本中的 [==] 取代成你想要的字串',
                            'regEx.escape()：設定文字字串中，哪種特殊字元，可以從字串中脫離，通常會搭配 JS字串 .replace() 方法',
                        ]
                    },
                    {
                        title: '正則表示式【"自訂"字元類型】匹配規則，用中括號設定類型',
                        list: [
                            '[a]：匹配單個 a 字元',
                            '[^a]：匹配所有字元，除了 a 字元，排除符號 ^',
                            '[abc]：匹配完整的 abc 字串',
                            '[^abc]：匹配所有字串，除了 abc 字元',
                            '[a-z]：匹配範圍 a 到 z 字元，只匹配小寫字母',
                            '[^a-z]：匹配所有範圍，除了 a 到 z 字元',
                            '[0-9]：匹配 0 到 9 字元',
                            '[^0-9]：匹配所有字元，除了 0 到 9 字元',
                        ]
                    },
                    {
                        title: '正則表示式【特殊字元】用在正則字串中' ,
                        list: [
                            ' | (or)：a|b：匹配 a 或 b 字元：注意!! 一個特殊字元，只代表一格的字元條件',
                            ' . (dot)：匹配所有字元，包括 Unicode，除了 \\n 換行字元：注意!! 一個特殊字元，只代表一格的字元條件',
                            '\\w：匹配所有半形字元：注意!! 一個特殊字元，只代表一格的字元條件',
                            '\\d：匹配 0-9 字元：注意!! 一個特殊字元，只代表一格的字元條件',
                            '\\D：匹配所有字元，除了 0-9 字元：注意!! 一個特殊字元，只代表一格的字元條件',
                            '\\s：匹配 space、tab、newline 特殊字元',
                            '\\S：匹配所有不是空白字元 ( space、tab、newline ) 的字元',
                            '[\\b]：匹配倒退鍵',
                            '\\0：匹配 null 字元，',
                            '\\n：匹配換行字元 newline',
                            '\\f：匹配相同的 \\f 字串，但是會傳回該字串的位置：使用方式：JS字串.search(/\\f/)：這樣就會傳回字元種子位置',
                            '\\r：匹配 carrage returns 字元，\\r 字元，會將游標位置設定在每列的第一個位置，但不會換行，只是在HTML中，並不會對這類的控制字元做處理',
                            '\\t：匹配 tab 字元',
                            '\\v：匹配垂直 tab 字元',
                            '\\ddd：匹配 8 進位字元碼，(41 HEX == 101 Oct)\\101 匹配到 A，\\132 匹配到 Z',
                            '\\xhh：匹配 16 進位字元碼，(41 hex == A ,61 hex == a)：\\x41 匹配到 A，\\x61 匹配到 a',
                            '\\uhhhh：匹配四位數的 16 進位 Unicode 編碼，\\u0057 匹配到 W',
                            '\\p{}：搭配 test()，檢查是否匹配 Unicode 屬性',
                            '\\P{}：搭配 test()，檢查是否沒匹配 Unicode 屬性',

                        ],
                    },
                    {
                        title: '正則表示式【聲明用字元】',
                        list:[
                            ' ^：聲明在字串開頭，多行模式下為每一列開頭：使用方式： /^abc/ ，只會匹配 abc 開頭的字串：注意!!不要和 [^abc] 搞混，是不同意思',
                            ' $：聲明在字串結尾，多行模式下為每一列結尾：使用方式： /abc$/ ，只會匹配 abc 結尾的字串',
                            ' \\b：聲明空白字元 blank 之後或之前：使用方式：/\\babc/ 會匹配到字串開頭的 abc 與 空白之後的 abc：/abc\\b/ 會匹配 字串結尾 abc 或 空白之前的 abc ',
                            ' \\B：與 \\b 邏輯相反，/\\Babc/ 會找不是 abc 開頭的，通常會搭配 JS字串.search(/\\Babc/) 傳回位置：其實，當使用 \\b 或 \\B 就代表，你已經知道字串存在，只是需要位置才能處理',
                            'x(?=y)：聲明 x 字串，後面必須是 y 字串，注意!! x 與 y 字串中的空白字元會影響結果：可以用來驗證某字串後面是否跟著特定字串：',
                            'x(?!y)：與 x(?=y) 邏輯相反',
                            '(?<=y)x：聲明 x 前面必須是 y',
                            '(?<!y)x：聲明 x 前面必須不是 y，注意!! 利用特殊字元，可以做靈活的變化：如 (?<!y.*)x 這樣任何形式的 y 都可以被偵測出來' ,
                        ]
                    },
                    {
                        title: '正則表示式【取回分組】',
                        list:[
                            '(x)：匹配 x 後，將 x 儲存在結果陣列中',
                            '(?<n>x)：匹配 x 後，並將 x 命名為 n，之後用名稱 n 取回內容',
                            '(?flag:x)：針對 x 使用特定正則 flag 規則匹配',
                            '(?flag-flag:x)：針對 x 不使用特定正則 flag 規則匹配',
                        ]
                    },
                    {
                        title: '正則表示式【數量符號】',
                        list:[
                            'x+：匹配至少有 1 個以上的 x',
                            'x*：匹配 0 到多個 x',
                            'x?： 匹配 0 到 1 個 x',
                            'x{n}：匹配 n 個 x',
                            'x{n,m}：匹配 n 到 m 個 x',
                            'x{n,}：匹配 n 以上個 x',
                        ],
                    }

                ],                

            };
        },

    }

</script>