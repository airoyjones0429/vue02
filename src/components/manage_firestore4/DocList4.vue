<!-- 這個模板處理 Firestore 資料集合 websell 的 products 文件的 CRUD 功能及樣式暫定完成-->
<template>
    <p>{{ docName }} 產品新增修改管理頁面</p>

    <!-- 下面部分處理，取回資料前後，給使用者參考資訊 -->
    <div class="alert alert-info" v-if="!hasData">
        <span class="spinner-border spinner-border-sm"></span>
        <strong>Info!</strong><span >載入資料中...</span>
    </div>
    <div class="container alert alert-success alert-dismissible" v-if="hasData && showLoadFinishMessage" >
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        <strong>Info!</strong><span v-if="hasData">載入完成</span>
    </div>

    <h5>BS5 分頁控制1</h5>
    <!-- 功能已完成!!   可以單獨建立一個資料管理清單介面，可自訂每頁出現的資料數量，並切換資料內容 -->
    <!-- CSS 設定寬度後，容器不會隨畫面改變大小 -->
    <!-- <div style="width: 800px;"> -->
    <div class="container" >
        <div class="container btn-group btn-group-lg">
            <button type="button" class="btn btn-success" @click="createNewItem" >新增產品</button>
            <button type="button" class="btn btn-warning" @click="findProduct" >查詢產品</button>
            <button type="button" class="btn btn-danger" @click="previousPage" :disabled="currentPage==1" >上一頁</button>
            <button type="button" class="btn btn-primary" :disabled="currentPage==pageNumber"
            v-for="pageNumber in Math.floor((RecordQty/perPageRecords)+0.99)" :key="pageNumber" 
            @click="currentPage=pageNumber;selectItemIndex=-1;">
            <!-- 上面用意，切換分頁時，初始化查詢結果，不然會一直滾動到上次的查詢結果 -->
            <!-- 中間顯示頁碼，如果再用 div 包起來，會導致按鈕變小 -->
            {{ pageNumber }}
            </button>
            <button type="button" class="btn btn-warning" @click="currentPage=0" >隱藏</button>
            <button type="button" class="btn btn-danger" @click="nextPage" :disabled="currentPage>=Math.floor((RecordQty/perPageRecords)+0.99)" >下一頁</button>
        </div>
    </div>

    <p>-----------------</p>
    <update-item4 :update-data-package="newItemsDataPackage" 
        :check-field-name="checkFieldName"  
        :field2-input-type="field2InputType"
        :index2-chinese-name="index2ChineseName"
        :input-mode="'addNewMode'"
        :show-page-button="(index)=>{ return !!index ;}"
        @update-input-box="( obj ) => {updateNewItem( obj.RecordName , obj.FieldName ,obj.value , obj.event);}" 
        @write-data="saveNewItem"
    />

    <!-- !!注意  這裡將外部方法，傳送到子模板中，用 prop 處理 -->
    <update-item4 :update-data-package="updateDataPackage" 
        :check-field-name="checkFieldName"  
        :field2-input-type="field2InputType"
        :index2-chinese-name="index2ChineseName"
        :show-page-button="showPageButton1"
        :input-mode="'updateMode'"
        :select-item-index = "selectItemIndex"
        :select-item-page = "currentPage"
        ref="updateMode"
        @update-input-box="( obj ) => {console.log( obj );updateInputBox2( obj.RecordName , obj.FieldName ,obj.value , obj.event);}" 
        @write-data="writeData"
        @re-move-data="removeItem"
                
        @update-mode-event="(FieldName)=>{this.updateDataPackage[FieldName]['updated'] = true;objSetFocus(); console.log('DocList2.line.81',obj) ; }"
    />
    <!-- updateModeEvent 在輸入方塊獲得焦點時，會觸發這個自定義Vue事件到外部、上層主件 -->
    <!-- 刷新 UI 會造成  使用者喪失焦點  必須對同元素在 UI 不會刷新的狀態下  再點一次元素  會造成 UX 下降 -->
    <!-- 更新資料  採用 一個按鈕來控制  刷新 UI 介面  然後給使用者輸入  就不會有上述問題 -->
    <!-- 目前版本是朝向  不用按鈕控制的方式  UX 會下降的版本 -->

</template>
<script>
import { mapActions , mapGetters } from 'vuex';
import * as my from '../../myCollection'; //使用命名空間方法，匯入 myCollection.js，空間名稱為 my

import UpdateItem4 from './UpdateItem4.vue';

    export default {
        // 載入上面 import 的元件，這樣就可以在範本區塊使用 <product-item1> 標籤
        // 如果沒用到的元件，載入太多，會造成效能問題!!
        components:{
            UpdateItem4
        },
        data(){
            return{
                RecordQty: 0 , //代表文件欄位數量，以欄位當作產品資訊紀錄的儲存空間
                perPageRecords: 3 , // 可以動態調整每頁數量，或按鈕數量的變數
                currentPage: 0 , //分頁控制 1 用的變數
                updateDataPackage: null , //包含所有欄位名稱的更新資料 , 如果用 {} 設定，不容易直接判別內容為空
                // 以 "文件名稱->欄位名稱->欄位對應屬性" 這樣設定產品內容
                docName: my.myCollectionDoc.product1  , //文件名稱，我用文件名稱當作資料分類，product 代表產品
                fieldName: null ,//欄位名稱，用來儲存產品名稱，也就是說產品越多種，欄位會越多
                fieldContent: my.myProductContentFields ,
                newItemsDataPackage: null , //新增項目暫存空間
                hasData:false ,//有資料時，設定為 true
                selectItemIndex:-1 , //預設沒有查詢資料
                showLoadFinishMessage: true , // 顯示載入完成訊息，用來控制

                
            };
        },
        watch:{
            // 這裡控制 分頁按鈕 的數量 目前是 [1][2][3][4][5] 五個空間
            RecordQty(newVal){
                let ppR = this.perPageRecords ;
                let n = Math.floor( newVal / ppR ) ;
                while( n > 5 ){ //如果大於 5 頁，調整每頁顯示資料筆數數量
                    ppR++ ;
                    n = Math.floor( newVal / ppR ) ;
                }
                this.perPageRecords = ppR ;
            },
            dataKeyArray: {
                handler(newVal) {
                    this.RecordQty = newVal.length;
                    console.log('watch.line.61', this.RecordQty , this.dataKeyArray);
                },
                deep: true //要注意陣列必須使用深層監視，不然看不到變化
            },
            // 注意!! 這裡是監看 VueX 的 mapGetters 狀態，監看陣列必須要 deep: true
            getProduction:{
                handler(newVal){
                    this.updateDataPackage = newVal;
                },
                deep: true ,
            },
            hasData(newVal){
                console.log('DocList3.line.124.watch.hasData')
                if (newVal){
                    console.log('DocList3.line.126 有資料三秒後,訊息自動消失')
                    setTimeout(() => {
                        this.showLoadFinishMessage=false ;                        
                    }, 3000);
                }

            }
        },

        computed:{
            // 取得 Vuex 狀態管理的產品內容
            ...mapGetters(['getProduction']),
        },
        // 當掛載組件後，要先抓取資料
        async mounted(){         
            await this.catchData() ;
        },
        methods:{
            ...mapActions(['fetchProductsFromFirebase','setRemoveField',
            'setNewItemInFieldOnDoc','setValueInFieldOnDoc','setManyValueToDoc']),
            // 抓取 Firebase 指定集合，特定文件資料
            async catchData(){
                // 傳回產品資訊
                const product =  this.getProduction ;
                const hasProduct = !!product ; // 如果 product 是 null undefine 這裡會是 false

                if(!hasProduct){ 
                    // 將資料抓到本機，狀態管理中
                    await this.fetchProductsFromFirebase( { collection_name: my.myFirebaseCollection  , document_name:my.myCollectionDoc.product1 } );
                    console.log('DocList1.line.141 抓資料');
                } else {
                    console.log('DocList1.line.143' , product);
                }
                // 將資料儲存在"更新暫存區 updateDataPackage"，將箭頭函數除存在變數中，用定時器延遲執行一次，如果尚未讀取到資料，會自動在執行自己
                const st = ()=>{
                    this.updateDataPackage = this.getProduction ;
                    console.log( 'DocList1.line.91 setTimeout' );
                    if (  this.updateDataPackage  === null ||  this.updateDataPackage  === undefined ) {
                        console.log( 'DocList3.line.164.st()');
                        setTimeout( st , 1000 );
                    }else{
                        this.hasData = true ;
                        // 將文件中的每個欄位 key 及內容儲存在陣列中，用 Object.keys() 方法抓出物件的所有屬性名稱，並儲存成陣列
                        Object.keys( this.updateDataPackage ).forEach(
                            key=>{
                                //在 指定 key 欄位中 增加一個  臨時的  "修改欄位 updated"
                                this.updateDataPackage[key] = { ...this.updateDataPackage[key] , 'updated':false } ;
                                
                            } 
                        );

                        console.log( 'DocList3.line.163');
                        // 要取得物件資料的長度時，其實就是在計算物件的欄位數量，這裡的 keys 方法就是在讀取欄位名稱，
                        // 並儲存成陣列形式，所以可以直接使用 length 屬性讀取
                        this.RecordQty = Object.keys( this.updateDataPackage).length ;
                    }
                };
                setTimeout( st , 100 );
                
            },
            // 將測試資料儲存在 Firebase 集合，特定文件，特定欄位中
            writeData( productName , event ){
                console.log( 'DocList1.line.159 要更新的資料',this.updateDataPackage[productName] , event.target.parentNode.parentNode ) ;
                
                

                this.setValueInFieldOnDoc({ collection_name:my.myFirebaseCollection , document_name: this.docName , field_name: productName , data_content: this.updateDataPackage[productName]  } );
            },
            // 將欄位名稱轉為中文名稱
            index2ChineseName( keyName ){
                return my.index2ChineseName( keyName );
            },
            // 依照欄位名稱，指定輸入方塊的類型
            field2InputType( keyName ){
                return my.field2InputType(keyName);
            },
            
            // 將資料儲存到 Firebase 中 , dataPackage 是產品資料格式，為一欄位中含有物件資料
            saveDataToFirebase( dataPackage ){
                this.setManyValueToDoc(
                    { 
                        collection_name:my.myFirebaseCollection  ,
                        document_name:this.docName ,
                        // 下面可以省略，只要輸入 dataPackage 就可以了，因為接受端的物件屬性與送出的變數名稱相同
                        dataPackage: dataPackage 
                    }  );
            },
            //下一頁資料
            nextPage(){
                let pageNumber = this.currentPage ;
                if (pageNumber + 1 < Math.floor( this.RecordQty * this.perPageRecords )){
                    console.log( 'DocList1.237 nextPage',this.currentPage );
                    this.currentPage++;                    
                }
            },
            //上一頁資料
            previousPage(){
                let pageNumber = this.currentPage ;
                console.log( 'DocList1.245 previousPage',this.currentPage );
                if( pageNumber - 1 >= 1 ){
                    this.currentPage-- ;
                }
            },
            // 注意!! 直接使用物件 v-for ，要選擇顯示中間數個物件時，必須要設定上下限制
            // 注意!! 注意!! 分頁只控制頁碼，子組件只負責顯示，此方法提供子組件是否要顯示子組件項目的條件，達到分頁顯示的效果
            showPageButton1( RecordIndex ){
                // RecordIndex 按下的頁碼                
                const condition1 = RecordIndex > ( this.currentPage-1) * this.perPageRecords ;
                const condition2 = RecordIndex <= ( this.currentPage) * this.perPageRecords ;
                console.log('DocList2.line.236 ', condition1 , condition2 ) ;
                return condition1 && condition2 ;
            },            
            // 不顯示 updated 欄位，但其他欄位要顯示
            checkFieldName( FieldName ){
                return FieldName != 'updated' ;
            },
            // 將輸入方塊的內容，即時儲存到對應儲存位置中
            updateInputBox2( productName  ,fieldName ,value ,event ){
                // 注意!!  這裡發生事件的元素在子組件中，增加的CSS樣式類別 .update，可以 限定 (scoped)在子模組中
                console.log( `DocList2.311 ${productName}  ${fieldName}  ${value} => ${event}` );
                
                this.updateDataPackage[productName][fieldName] = value ;
                // 資料有被改變過，不論有沒有變回來，只要有輸入，就算改變
                this.updateDataPackage[productName]['updated'] = true ;    
                
                
                // 獲取目標元素的父元素
                const parent = event.target.parentNode;
                // 因為子模板有 4 層 DIV，要用 parentNode 往上搜尋節點
                // 要注意，如果已經有相同的 CSS 設定，可能會無法看到增加樣式的效果
                const grandParent = parent.parentNode.parentNode.parentNode ;

                // 注意!!  如果增加的 CSS 樣式，不是全域的，在子模組可能不會產生效果

                // 遍歷所有祖父以下元素，用 childern.length 取得子節點數量
                // 用 parent.children[i] 取回第 i 個元素
                for (let i = 0; i < parent.children.length; i++) {
                    const sibling = parent.children[i];
                    sibling.classList.add('update'); // 為兄弟元素增加 CSS 樣式
                }

                for (let i = 0; i < grandParent.children.length; i++) {
                    const sibling = grandParent.children[i];
                    sibling.classList.add('update'); // 為兄弟元素增加 CSS 樣式
                }

            },
            // 將新增的項目寫入到，新增暫存區
            updateNewItem( productName  ,fieldName ,value ,event ){
                console.log( `DocList2.256.updateNewItem ${productName}  ${fieldName}  ${value} => ${event}` );               
                this.newItemsDataPackage[productName][fieldName] = value ;
            },
            // 將新增項目儲存到 Firebase 中，並從新增暫存區移除已新增資料，將資料寫入到本地資料暫存區中
            saveNewItem(RecordName ,event ){
                const item = this.newItemsDataPackage[RecordName] ;
                
                // 從新增暫存區移除已儲存資料
                delete this.newItemsDataPackage[RecordName] ;
                console.log( `DocList2.269.saveNewItem` , RecordName , this.newItemsDataPackage );
                console.log( `DocList2.270.saveNewItem` , event );

                // this.hasNewData = true;

                this.saveDataToFirebase( { [RecordName] : item } );
                console.log('DocList2.Test.276');
            },            
            // 
            removeItem(RecordName , event ){
                console.log('DocList2.line.277.removeItem', RecordName , event);
                // console.log( {collection_name:my.myFirebaseCollection , document_name: this.docName , docFieldName:RecordName } );
                this.setRemoveField({ collection_name:my.myFirebaseCollection , document_name: this.docName , docFieldName:RecordName } );

            },
            createNewItem(){
                console.log('DocList2.line.280.createNewItem');
                
                // 顯示輸入視窗，讓使用者輸入字串
                const userInput = prompt("請輸入產品名稱：");

                // 檢查使用者是否有輸入字串，並使用 trim() 去除前後空白
                // !!注意  幾乎所有邏輯運算，都會按順序處理，當條件必定成立後，後面的邏輯，會直接不執行，因為不影響結果
                if (userInput && userInput.trim()) {
                    // 如果有輸入字串，繼續執行
                    alert("您輸入的字串是：" + userInput);
                    // 在這裡添加後續執行的邏輯

                    this.newItemsDataPackage = { ...this.newItemsDataPackage , [userInput]:{ ...this.fieldContent} };
                    console.log( 'DocList2.line.261.createNewItem', this.newItemsDataPackage );
                } else {
                    // 如果沒有輸入字串，不執行任何操作
                    alert("您沒有輸入任何字串。");
                }
            },
            // 利用主組件的 ref 來觸發子組件方法
            objSetFocus( ){
                // 這個組件有 ref="updateMode" 的自定義 Vue 元素，
                // 所以可以用下面指令，在父組件 執行 子組件的方法
                this.$refs.updateMode.focusInput();
                console.log('DocList2.line.359');
            },
            // 查詢產品
            findProduct(){
                // 顯示輸入視窗，讓使用者輸入字串
                const userInput = prompt("請輸入查詢產品名稱：");

                if (userInput && userInput.trim()) {
                    // 如果有輸入字串，繼續執行
                    // 在這裡添加後續執行的邏輯
                    const productKeys = Object.keys(  this.updateDataPackage );
                    let tempArray = [] ;
                    console.log( 'DocList2.line.261.findProduct.productKeys', productKeys,'  ',userInput );
                    
                    let boolFind = false ;
                    do{
                        const productName = productKeys.shift();
                        tempArray.push( productName );
                        if(userInput == productName) {  boolFind = true;break; }
                    }while( productKeys.length > 0  ) ;

                    console.log( '找到產品' , boolFind ) ;

                    if (boolFind){
                        // 找到資料
                        const Rcount = tempArray.length  ;
                        console.log( Rcount / this.perPageRecords);
                        // floor() 會無條件捨去小數點，取最小整數，加 0.99 還無法變成 2 的頁碼必定是 1，perPageRecords 大於 100 時要調整為 0.999
                        const Rpage = Math.floor( (Rcount / this.perPageRecords)+0.99 ) ;
                        console.log( '產品索引位置' , Rcount-1 );
                        console.log( '產品分頁位置' , Rpage );
                        const pageItemNo = Rcount - ((Rpage-1) * this.perPageRecords)
                        console.log( '分頁第 ? 項' , pageItemNo  );
                        console.log( '收尋到的產品資料' , this.updateDataPackage[userInput] );
                        this.currentPage = Rpage ;
                        this.selectItemIndex = pageItemNo ;

                    }
                    // console.log( 'DocList2.line.261.findProduct.indexOf()', productKeys.indexOf(userInput) );
                    // console.log( 'DocList2.line.261.findProduct.includes()', productKeys.includes(userInput) );
                    // console.log( 'DocList2.line.261.findProduct.find()', productKeys.find(userInput) );
                    // console.log( 'DocList2.line.261.findProduct.filter()', productKeys.filter(userInput) );
                } else {
                    // 如果沒有輸入字串，不執行任何操作
                    console.log("您沒有輸入任何字串。");
                }
            },
        },
    };

</script>

<style scoped>
.custom-text {
    font-size: 16px; /* 默認字體大小 */

    @media (min-width: 576px) { /* 小型設備 */
        font-size: 18px;
    }

    @media (min-width: 768px) { /* 中型設備 */
        font-size: 20px;
    }

    @media (min-width: 992px) { /* 大型設備 */
        font-size: 24px;
    }

    @media (min-width: 1200px) { /* 超大型設備 */
        font-size: 28px;
    }
}
</style>