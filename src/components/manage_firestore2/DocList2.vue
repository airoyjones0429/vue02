<template>
    <p>{{ docName }} 文件管理</p>

    <!-- 下面部分處理，取回資料前後，給使用者參考資訊 -->
    <div class="alert alert-info" v-if="!hasData">
        <span class="spinner-border spinner-border-sm"></span>
        <strong>Info!</strong><span >載入資料中...</span>
    </div>
    <div class="container alert alert-success alert-dismissible" v-if="hasData">
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        <strong>Info!</strong><span v-if="hasData">載入完成</span>
    </div>
    
    <!-- 這部分測試，產品項目模板，可以讀取 Firebase 資料庫了
     product-image 將圖片名稱儲存在資料庫中
     product-name  產品名稱
     product-spec-name  產品規格名稱
     product-stocks  產品庫存數量，訂購數量不能大於庫存數量
     poduct-order-quantity  產品訂購數量，確定訂購的資料會儲存在訂單中，這裡只要能暫時儲存就可以了
     order-product 為內部 emit 出的事件名稱，會傳出訂購項目及訂購數量
     測試完成，之後要將 product-item2 單獨放到產品選擇頁面上
     DocList2 留給後台資料管理使用
    -->
    <product-item2   v-for="( RecordContent , RecordName ) in updateDataPackage"  :key="RecordName" :title="RecordName" 
        :product-image="RecordContent.imgName"  :product-name="RecordName" :product-spec-name="RecordContent.name"
        :product-stocks="RecordContent.stock_qty" :product-order-quantity="0" 
        :product-sale-price="RecordContent.sale_price"
        @order-product="( obj )=> { console.log(obj);}"
        />


    <h5>BS5 分頁控制1</h5>
    <!-- 功能已完成!!   可以單獨建立一個資料管理清單介面，可自訂每頁出現的資料數量，並切換資料內容 -->
    <!-- BS5 container 本身具有置中效果-->
    <div class="container">
        <div class="container btn-group btn-group-lg">
            <button type="button" class="btn btn-success" @click="createNewItem" >新增產品</button>
            <button type="button" class="btn btn-danger" @click="previousPage" :disabled="currentPage==1" >上一筆</button>
            <button type="button" class="btn btn-primary" :disabled="currentPage==pageNumber"
            v-for="pageNumber in Math.floor((RecordQty/perPageRecords)+0.99)" :key="pageNumber" 
            @click="currentPage=pageNumber;">
            <!-- 中間顯示頁碼，如果再用 div 包起來，會導致按鈕變小 -->
            {{ pageNumber }}
            </button>
            <button type="button" class="btn btn-warning" @click="nextPage" :disabled="currentPage>=Math.floor((RecordQty/perPageRecords)+0.99)" >下一筆</button>
        </div>
    </div>
    

    <!-- 下面直接使用 目前頁碼 * 每頁物件數量， -->
    <!-- 使用 vue  :style 語法動態調整顯示元素樣式，RecordIndex 應該從 0 開始，但不是，所以要減 1 -->
    <div v-for="RecordIndex in currentPage*perPageRecords" :key="RecordIndex" 
        :style="{display: (RecordIndex>(currentPage-1)*perPageRecords)? 'block':'inline-block' }" >
        
        <!-- 下面為要顯示出的索引編號 -->
        <div v-if="showPageButton( RecordIndex )" >
             {{ RecordIndex }}:{{ dataKeyArray[RecordIndex-1] }}:{{ dataContentArray[RecordIndex-1] }}
        </div>

        <!-- 下面是紀錄語法使用，用來代表部會被顯示出來的項目 -->
        <div v-else>{{ RecordIndex }}</div>
    </div>

    <p>-----------------</p>
    <update-item2 :update-data-package="newItemsDataPackage" 
        :check-field-name="checkFieldName"  
        :field2-input-type="field2InputType"
        :index2-chinese-name="index2ChineseName"
        :input-mode="'addNewMode'"
        :show-page-button="(index)=>{ return !!index ;}"
        @update-input-box="( obj ) => {updateNewItem( obj.RecordName , obj.FieldName ,obj.value , obj.event);}" 
        @write-data="saveNewItem"
    />

    <!-- !!注意  這裡將外部方法，傳送到子模板中，用 prop 處理 -->
    <update-item2 :update-data-package="updateDataPackage" 
        :check-field-name="checkFieldName"  
        :field2-input-type="field2InputType"
        :index2-chinese-name="index2ChineseName"
        :show-page-button="showPageButton1"
        :input-mode="'updateMode'"
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
import ProductItem2 from './ProductItem2.vue'; //只有在 DocList2
import UpdateItem2 from './UpdateItem2.vue';

    export default {
        // 載入上面 import 的元件，這樣就可以在範本區塊使用 <product-item1> 標籤
        // 如果沒用到的元件，載入太多，會造成效能問題!!
        components:{
            ProductItem2,UpdateItem2
        },
        data(){
            return{
                RecordQty: 0 , //代表文件欄位數量，以欄位當作產品資訊紀錄的儲存空間
                perPageRecords: 3 , // 可以動態調整每頁數量，或按鈕數量的變數
                currentRecord: 0 , // 分頁控制 2 用的變數
                currentPage: 0 , //分頁控制 1 用的變數
                dataKeyArray: [] , // 用來儲存欄位名稱，每個欄位代表一個產品，下個版本，將會移除此屬性
                dataContentArray: [] , // 與 dataKeyArray 對應的產品內容，下個版本，將會移除此屬性
                updateDataPackage: null , //包含所有欄位名稱的更新資料 , 如果用 {} 設定，不容易直接判別內容為空
                // 以 "文件名稱->欄位名稱->欄位對應屬性" 這樣設定產品內容
                docName: my.myCollectionDoc.product1  , //文件名稱，我用文件名稱當作資料分類，product 代表產品
                fieldName: null ,//欄位名稱，用來儲存產品名稱，也就是說產品越多種，欄位會越多
                fieldContent: my.myProductContentFields ,
                newItemsDataPackage: null , //新增項目暫存空間
                hasData:false ,//有資料時，設定為 true

                // 下面屬性沒用了，因為可以直接 watch 監視 Vuex 的 getter
                // hasNewData:false // 當新增資料按下 WriteData 時，這裡會設定為 true
            };
        },
        watch:{
            RecordQty(newVal){
                let ppR = this.perPageRecords ;
                let n = Math.floor( newVal / ppR ) ;
                while( n > 10 ){ //如果大於 10 頁，調整每頁顯示資料筆數數量
                    ppR++ ;
                    n = Math.floor( newVal / ppR ) ;
                }
                this.perPageRecords = ppR ;
            },
            dataKeyArray: {
                handler(newVal) {
                    this.RecordQty = newVal.length;
                    this.currentRecord = 1 ;
                    console.log('watch.line.61', this.RecordQty , this.dataKeyArray);
                },
                deep: true //要注意陣列必須使用深層監視，不然看不到變化
            },
            // hasNewData(newVal){
            //     console.log('watch.124.hasNewData',newVal)
            //     if ( newVal ){
            //         console.log('watch.126.hasNewData',newVal)
            //         //使用者按下儲存按鈕
            //         setTimeout(() => {
            //             this.updateDataPackage = this.getProduction;
            //             this.hasNewData = false ;
            //         }, 2000);
            //     }
            // },

            // 注意!! 這裡是監看 VueX 的 mapGetters 狀態，監看陣列必須要 deep: true
            getProduction:{
                handler(newVal){
                    this.updateDataPackage = newVal;
                },
                deep: true ,
            }
            // 以下沒用了
            // 當有資料被移除時，移除的資料要加入到  目前的產品暫存資料區塊中
            // newItemsDataPackage:{
            //     handler(newVal,oldVal){
            //         console.log( 'DocList2.watch.line.124.newVal' , newVal );
            //         console.log( 'DocList2.watch.line.124.oldVal' , oldVal );
            //         if ( Array.isArray(newVal) ){
            //             Array.keys(newVal).forEach(
            //                 key => {
            //                     console.log( 'watch.129',key );
            //                 }
            //             );
            //             Array.keys(oldVal).forEach(
            //                 key => {
            //                     console.log( 'watch.134',key );
            //                 }
            //             );                    

            //         }
            //     },
            //     deep: true // 深層監視，才能偵測到矩陣新增、移除、更新的變化
            // }
        },

        computed:{
            // 取得 Vuex 狀態管理的產品內容
            ...mapGetters(['getProduction']),
        },
        
        mounted(){
            this.catchData() ;
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
                    console.log('DocList1.line.84 抓資料');
                } else {
                    console.log('DocList1.line.86' , product);
                }
                // 將資料儲存在"更新暫存區 updateDataPackage"，將箭頭函數除存在變數中，用定時器延遲執行一次，如果尚未讀取到資料，會自動在執行自己
                const st = ()=>{
                    this.updateDataPackage = this.getProduction ;
                    console.log( 'DocList1.line.91 setTimeout' );
                    if (  this.updateDataPackage  === null ||  this.updateDataPackage  === undefined ) {
                        console.log( 'st st' ,product);
                        setTimeout( st , 1000 );
                    }else{
                        this.hasData = true ;
                        // 將文件中的每個欄位 key 及內容儲存在陣列中，用 Object.keys() 方法抓出物件的所有屬性名稱，並儲存成陣列
                        Object.keys( this.updateDataPackage ).forEach(
                            key=>{
                                // 增加一個  臨時的  "修改欄位 updated"
                                this.updateDataPackage[key] = { ...this.updateDataPackage[key] , 'updated':false } ;
                                
                                // 將產品項目的資料，暫存在本地端，利用二個陣列的索引當作資料連結
                                this.dataKeyArray.push(key) ; 
                                this.dataContentArray.push( this.updateDataPackage[key] );
                            } );
                        console.log('103 end st' , this.dataKeyArray , this.dataContentArray );
                    }
                };
                setTimeout( st , 1000 );
                
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
            // 注意!! 使用 分頁數 * 每頁物件數 ，顯示中間數個物件時，只要設定下限，大於才顯示
            showPageButton( RecordIndex ){
                // RecordIndex 按下的頁碼       
                console.log('DocList2.line.231 ', RecordIndex , RecordIndex > ( this.currentPage-1) * this.perPageRecords )         
                return RecordIndex > ( this.currentPage-1) * this.perPageRecords ;
            },
            // 注意!! 直接使用物件 v-for ，要選擇顯示中間數個物件時，必須要設定上下限制
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
                // 所以可以用下面指令，執行子組件的方法
                this.$refs.updateMode.focusInput();
                console.log('DocList2.line.359');
            },
        },
    };

</script>

<!-- 這裡原本是 scoped -->
<style>
.update{
    background-color: coral;
}
</style>