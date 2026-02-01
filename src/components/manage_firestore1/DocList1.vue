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
    
    <!-- 這部分測試，產品項目模板 -->
    <product-item1/>

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


    <div class="container mt-3">
        <h2>包含標頭及標尾的卡片樣式</h2>
        <div class="card" v-for="( RecordContent , RecordName ) in updateDataPackage"  :key="RecordName" :title="RecordName">
            <div class="card-header text-light bg-primary h2">產品名稱：{{RecordName}}</div>
            <div class="card-body d-flex" >
                <div v-for="(Field , FieldName) in RecordContent" :key="FieldName" >
                    <label :for="FieldName" class="">{{ index2ChineseName(FieldName) }}</label>
                    <input :type="field2InputType(FieldName)" class="form-control" :placeholder="'請輸入'+index2ChineseName(FieldName)" :name="FieldName"  :value="Field"
                    @input="updateInputBox( RecordName ,FieldName , $event.target.value )"                    
                    >
                </div>
            </div>
            <div class="card-footer">
                <button @click="console.log(RecordContent)">列出目前記錄內容</button>
                <button @click="writeData(RecordName)">writeData</button>
                
            </div>
        </div>
    </div>

    <!-- BS5 container 本身具有置中效果-->
    <div class="container">
        <div class="container btn-group btn-group-lg">
          <button type="button" class="btn btn-danger" @click="previousRecord" :disabled="currentRecord==1" >上一筆</button>
          <div  v-for="value in (currentRecord - 1 + perPageRecords) " :key="value" @click="currentRecord=value" >
            <button type="button" class="btn btn-primary"  v-if="showPageButton(value)" 
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
import ProductItem1 from './ProductItem1.vue';
    export default {
        components:{
            ProductItem1,
        },
        data(){
            return{
                RecordQty: 0 , //代表文件欄位數量，以欄位當作產品資訊紀錄的儲存空間
                perPageRecords: 8 ,
                perPageRecordsD: 0 ,
                currentRecord: 0 ,
                dataKeyArray: [] ,
                dataContentArray: [] ,
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
                    console.log('watch.line.61', this.RecordQty);
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
                // 將資料儲存在更新暫存區
                const st = ()=>{
                    this.updateDataPackage = this.getProduction ;
                    console.log( 'DocList1.line.91 setTimeout' );
                    if (  this.updateDataPackage  === null ||  this.updateDataPackage  === undefined ) {
                        console.log( 'st st' ,product);
                        setTimeout( st , 1000 );
                    }else{
                        this.hasData = true ;
                        // 將文件中的每個欄位 key 及內容儲存在陣列中
                        Object.keys( this.updateDataPackage ).forEach( 
                            key=>{ 
                                // 增加修改欄位
                                this.updateDataPackage[key] = { ...this.updateDataPackage[key] , 'updated':false } ;

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
            updateInputBox( productName  ,field ,value ){
                this.updateDataPackage[productName][field] = value ;
                
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
            showPageButton( page ){
                // page 代表目前這個按鈕代表的頁碼               
                
                // const center =  Math.floor( this.perPageRecords /2 ) ;
                
                if ( this.currentRecord + this.perPageRecords <= this.RecordQty ){
                    // 頁碼  大於等於  目前所顯示的頁碼   且  小於  容許頁碼最大編號
                    return (page >= this.currentRecord ) && ( page  < this.currentRecord + this.perPageRecords ) ;
                } else {
                    return this.currentRecord <= page  ;
                }

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
        },
    };

</script>