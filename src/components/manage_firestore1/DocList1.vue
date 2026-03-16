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
    -->
    <product-item1   v-for="( RecordContent , RecordName ) in updateDataPackage"  :key="RecordName" :title="RecordName" 
        :product-image="RecordContent.imgName"  :product-name="RecordName" :product-spec-name="RecordContent.name"
        :product-stocks="RecordContent.stock_qty" :product-order-quantity="0" 
        @order-product="( obj )=> { console.log(obj);}"
        />


    <p>讀取特定文件資料</p>
    <!-- <div class="container bg-primary">
        <p>這區塊是讀取 Firebase 文件測試</p>
        <div class="container bg-success border border-warning" 
        v-for="( RecordContent , RecordName ) in updateDataPackage"  :key="RecordName" :title="RecordName">
            <p>產品名稱：{{RecordName}}</p>
            <div v-for="(Field , FieldName) in RecordContent" :key="FieldName" class="container bg-danger border border-dark">
            {{ index2ChineseName(FieldName) }} {{  Field }}
            </div>
        </div>
    </div> -->


    <!-- RecordName 是 Firebase 文件中的一個欄位名稱 -->
    <!-- RecordContent 是 RecordName 的內 -->
    <div class="container mt-3">
        <h2>包含標頭及標尾的卡片樣式</h2>
        <div class="card" v-for="( RecordContent , RecordName ) in updateDataPackage"  :key="RecordName" :title="RecordName">
            <div class="card-header text-light bg-primary h2">產品名稱：{{RecordName}}</div>
            <div class="card-body d-flex" >
                <div v-for="(Field , FieldName) in RecordContent" :key="FieldName" >
                    <div v-if="checkFieldName(FieldName)">
                        <label :for="FieldName"  >{{ index2ChineseName(FieldName) }}</label>
                        <input :type="field2InputType(FieldName)" class="form-control" 
                        :placeholder="'請輸入'+index2ChineseName(FieldName)" 
                        :name="FieldName"  :value="Field"
                        @input="updateInputBox( RecordName ,FieldName , $event.target.value , $event )"
                        >
                    </div>
                </div>
            </div>
            <div class="card-footer bg-secondary">
                <button @click="console.log(RecordContent)">列出目前記錄內容</button>
                <button @click="writeData(RecordName)">writeData</button>
            </div>
        </div>
    </div>

    <h5>BS5 分頁控制1</h5>
    <!-- 功能已完成!!   可以單獨建立一個資料管理清單介面，可自訂每頁出現的資料數量，並切換資料內容 -->
    <!-- BS5 container 本身具有置中效果-->
    <div class="container">
        <div class="container btn-group btn-group-lg">
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
    <!-- 使用 vue  :style 語法動態調整顯示元素樣式，RecordIndex 應該從 0 開始，但不是，所以要減 1 -->
    <div v-for="RecordIndex in currentPage*perPageRecords" :key="RecordIndex" 
        :style="{display: (RecordIndex>(currentPage-1)*perPageRecords)? 'block':'inline-block' }" >

        <!-- 下面為要顯示出的索引編號 -->
        <div v-if="showPageButton( RecordIndex )" >
        {{ RecordIndex }}:{{ dataKeyArray[RecordIndex-1] }}:{{ dataContentArray[RecordIndex-1] }}</div>

        <!-- 下面為不會顯示的索引編號 -->
        <div v-else class="bg-danger"  >{{ RecordIndex }}</div>
    </div>

    <h5>BS5 分頁控制2</h5>
    <!-- 功能已完成!! 當資料要逐筆檢查時，可自訂記錄按鈕數量-->
    <!-- BS5 container 本身具有置中效果-->
    <!-- 這個分頁選擇，有限制最大索引 -->
    <div class="container">
        <div class="container btn-group btn-group-lg">
          <button type="button" class="btn btn-danger" @click="previousRecord" :disabled="currentRecord==1" >上一筆</button>
          <div  v-for="value in RecordQty " :key="value" @click="currentRecord=value" >
            <button type="button" class="btn btn-primary"  v-if="showPageButton1(value)" 
            :disabled="(value>RecordQty)||(value==currentRecord) ">
                {{ value }}
            </button>
          </div>
          <button type="button" class="btn btn-warning" @click="nextRecord" :disabled="currentRecord>=RecordQty" >下一筆</button>
        </div>
    </div>
    <div>
        {{ currentRecord }}
    </div>

</template>
<script>
import { mapActions , mapGetters } from 'vuex';
import * as my from '../../myCollection'; //使用命名空間方法，匯入 myCollection.js，空間名稱為 my
import ProductItem1 from './ProductItem1.vue'; //只有在 DocList1
    export default {
        // 載入上面 import 的元件，這樣就可以在範本區塊使用 <product-item1> 標籤
        // 如果沒用到的元件，載入太多，會造成效能問題!!
        components:{
            ProductItem1,
        },
        data(){
            return{
                RecordQty: 0 , //代表文件欄位數量，以欄位當作產品資訊紀錄的儲存空間
                perPageRecords: 5 , // 可以動態調整每頁數量，或按鈕數量的變數
                currentRecord: 0 , // 分頁控制 2 用的變數
                currentPage: 0 , //分頁控制 1 用的變數
                dataKeyArray: [] , // 用來儲存欄位名稱，每個欄位代表一個產品
                dataContentArray: [] , // 與 dataKeyArray 對應的產品內容
                updateDataPackage: null , //包含所有欄位名稱的更新資料 , 如果用 {} 設定，不容易直接判別內容為空
                // 以 "文件名稱->欄位名稱->欄位對應屬性" 這樣設定產品內容
                docName: my.myCollectionDoc.product1  , //文件名稱，我用文件名稱當作資料分類，product 代表產品
                fieldName: null ,//欄位名稱，用來儲存產品名稱，也就是說產品越多種，欄位會越多
                fieldContent: my.myProductContentFields ,
                hasData:false ,//有資料時，設定為 true
            };
        },
        watch:{
            dataKeyArray: {
                handler(newVal) {
                    this.RecordQty = newVal.length;
                    this.currentRecord = 1 ;
                    console.log('watch.line.61', this.RecordQty , this.dataKeyArray);
                },
                deep: true //要注意陣列必須使用深層監視，不然看不到變化
            },
        },

        computed:{
            // 取得 Vuex 狀態管理的產品內容
            ...mapGetters(['getProduction']),
        },
        
        mounted(){
            this.catchData() ;
        },
        methods:{
            ...mapActions(['fetchProductsFromFirebase','setNewItemInFieldOnDoc','setValueInFieldOnDoc','setManyValueToDoc']),
            // 抓取 Firebase 指定集合，特定文件資料
            async catchData(){
                // 傳回有沒產品資訊
                const product =  this.getProduction ;
                const hasProduct = !!product ;

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
            writeData( productName ){
                console.log( 'DocList1.line.160 要更新的資料',this.updateDataPackage[productName] ) ;
                this.setValueInFieldOnDoc({ collection_name:my.myFirebaseCollection , document_name: this.docName , field_name: productName , data_content: this.updateDataPackage[productName]  } );
            },
            // 將欄位名稱轉為中文名稱
            index2ChineseName( keyName ){
                return my.index2ChineseName( keyName );
            },
            field2InputType( keyName ){
                return my.field2InputType(keyName);
            },
            // 將輸入方塊的內容，即時儲存到對應儲存位置中
            updateInputBox( productName  ,field ,value ,event ){
                console.log( `DocList1.line.194 ${productName} ${field} =  ${value}`);
                this.updateDataPackage[productName][field] = value ;
                
                //當有修改欄位時，修改的位置要變色
                // event.target.classList.add('update');

                // 獲取目標元素的父元素
                const parent = event.target.parentNode;
                // 因為有 4 層 DIV，要用 parentNode 往上搜尋節點
                // 要注意，如果已經有相同的 CSS 設定，可能會無法看到增加樣式的效果
                const grandParent = parent.parentNode.parentNode.parentNode ;
                
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
                
                // 資料有被改變過，不論有沒有變回來，只要有輸入，就算改變
                this.updateDataPackage[productName]['updated'] = true ;

            },
            // 將資料儲存到 Firebase 中
            saveDataToFirebase(){
                this.setManyValueToDoc({ collection_name:my.myFirebaseCollection  , document_name:this.docName , dataPackage: this.updateDataPackage }  );
            },
            //下一筆資料
            nextRecord(){
                this.currentRecord = ++this.currentRecord > this.RecordQty ? this.RecordQty : this.currentRecord ;
            },
            //上一筆資料
            previousRecord(){
                this.currentRecord = --this.currentRecord < 1 ? 1 : this.currentRecord ;
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
            showPageButton( RecordIndex ){
                // pageNumber 按下的頁碼                
                // const center =  Math.floor( this.perPageRecords /2 ) ;
                return RecordIndex > ( this.currentPage-1) * this.perPageRecords ;
            },
            showPageButton1( page ){
                // page 代表目前這個按鈕代表的頁碼               
                
                // const center =  Math.floor( this.perPageRecords /2 ) ;
                
                if ( this.currentRecord + this.perPageRecords <= this.RecordQty ){
                    // 頁碼  大於等於  目前所顯示的頁碼   且  小於  容許頁碼最大編號
                    return (page >= this.currentRecord ) && ( page  < this.currentRecord + this.perPageRecords ) ;
                } else {
                    const d = this.RecordQty - this.currentRecord - this.perPageRecords + 1
                    console.log( '234.d' ,d) ;
                    return this.currentRecord + d <= page  ;
                    

                }

            },
            checkFieldName( FieldName ){
                return FieldName != 'updated' ;
            },
            cssControl1(RecordContent){
                if (RecordContent['updated']=='true'){
                    return  true ;
                }
                return false ;
            },
        },
    };

</script>

<style scoped>
.update{
    background-color: coral;
}
</style>