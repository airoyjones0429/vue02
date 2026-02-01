<template>
    <p>{{ docName }} 文件管理</p>
    <div class="container bg-secondary">
        <p>這區塊是更新資料內容測試，直接在這個組件，存取資料庫</p>
        <button @click="catchData">抓文件所有資料</button>
        <button @click="writeData">寫入下面欄位資料</button>
        <button @click="showData">顯示輸入資料</button>
        <input type="text" v-model="fieldName" placeholder="請輸入欄位名稱">
        <!-- fieldContent 是物件資料型態，index 會對應到屬性名稱，也就是 key -->
        <input type="text" v-for="( _ , index) in fieldContent" :key="index"  @input="updateInputBox( index , $event.target.value)"
         :title="index" :name="index"  :placeholder="'請輸入' + index2ChineseName(index)">
    </div>

    <div class="container bg-warning">
        <p> 測試用子組件，建構資料後，一次性的用主組件將資料更新到 Firebase 文件中，使用 v-for 產生很多子組件，並設定 ref 屬性，在設計區塊使用 $refs 存取子項目內容</p>
        <button @click="RecordQty+=1">增加產品</button>
        <button @click="console.log(this.updateDataPackage)" title="子組件有儲存才會在這裡顯示出來">顯示全部資料</button>
        <button @click="fetchComponentsData" >提取組件資料到主組件</button>
        <button @click="saveDataToFirebase" >將資料儲存到 Firebase 中</button>
        <div v-for="value in RecordQty" :key="value">
            <field-list @dataComplete="showDataPackage" ref="record" />
        </div>
    </div>

</template>
<script>
import { mapActions , mapGetters } from 'vuex';
import * as my from '../../myCollection'; //使用命名空間方法，匯入 myCollection.js，空間名稱為 my
import FieldList from './FieldList.vue';
    export default {
        // 只在這個組件使用 FieldList 組件，就要這樣設定，包括上面的 import
        components:{
            FieldList,
        },
        data(){
            return{
                RecordQty: 1 , //代表文件欄位數量，以欄位當作紀錄
                updateDataPackage: null , //包含所有欄位名稱的更新資料 , 如果用 {} 設定，不容易直接判別內容為空
                // 以 "文件名稱->欄位名稱->欄位對應屬性" 這樣設定產品內容
                docName: my.myCollectionDoc.product1  , //文件名稱，我用文件名稱當作資料分類，product 代表產品
                fieldName: null ,//欄位名稱，用產品名稱當欄位名稱，也就是說產品越多種，欄位會越多
                fieldContent: { //欄位內容，將產品的規格，欄位對應屬性(用 map 型態)，儲存在欄位中
                    name: null , //產品名稱
                    imgName: null , //產品影像名稱
                    in_price: null , //產品進貨價格
                    stock_qty: null , //產品庫存數量
                } ,
            };
        },
        computed:{
            // 取得 Vuex 狀態管理的產品內容
            ...mapGetters(['getProduction']),
        },
        methods:{
            ...mapActions(['fetchProductsFromFirebase','setNewItemInFieldOnDoc','setValueInFieldOnDoc','setManyValueToDoc']),
            // 抓取 Firebase 指定集合，特定文件資料
            catchData(){
                // 傳回有沒產品資訊
                const hasProduct = !!this.getProduction ;
                const product = this.getProduction ;
                console.log(hasProduct?'有產品':'X');
                if(!hasProduct){ 
                    this.fetchProductsFromFirebase( { collection_name: my.myFirebaseCollection  , document_name:my.myCollectionDoc.product } );
                    console.log('DocList.line.26 抓資料');
                } else {
                    console.log('DocList.line.29' , product);
                }
                console.log('DocList.line.28');
            },
            // 將測試資料儲存在 Firebase 集合，特定文件，特定欄位中
            writeData(){
                console.log('DocList.line.38 ',this.fieldName , this.fieldContent);
                this.setValueInFieldOnDoc({ collection_name:my.myFirebaseCollection , document_name:my.myCollectionDoc.product , field_name: this.fieldName , data_content: this.fieldContent } );
            },
            // 顯示目前組件的資料內容
            showData(){
                console.log( this.fieldContent );
            },
            // 儲存子組件回應事件的資料
            showDataPackage( data ){
                this.updateDataPackage = { ...this.updateDataPackage , ...data } ;
                const dataP = this.updateDataPackage ;
                Object.keys( dataP ).forEach( 
                    key => {
                        console.log(  `${key}=>`, dataP[key] );
                    }
                );

                console.log( data );
                console.log( 'DocList.line.74',this.updateDataPackage );
            },
            // 將欄位名稱轉為中文名稱
            index2ChineseName( keyName ){
                switch(keyName){
                    case 'name':
                        return '名稱';
                    case 'imgName':
                        return '影像名稱';
                    case 'in_price':
                        return '進貨價格';
                    case 'stock_qty':
                        return '庫存數量';
                }
            },
            // 將輸入方塊的內容，即時儲存到對應儲存位置中
            updateInputBox( field ,value ){
                this.fieldContent[field] = value ;
                console.log( this.fieldContent[field] ) ;
            },
            // 在主組提取多個子組件資料內容
            fetchComponentsData(){
                let dataPackage = {} ;
                // 利用 vue 的 $refs 物件，可以快速找到模板中，特定的元素
                // 在標籤中，增加 ref = "refName"，就可以在 $refs 物件中，使用 $refs.refName 來選擇該標籤元素
                // ref 屬性，在 vue 自訂組件中，也可以直接使用，不用額外設定
                // 對於相同的 ref 屬性內容，會自動變成標籤元素陣列，利用陣列特性，可以直接使用 .forEach() 來將各個元素提取出來
                // 另外，在 vue 使用同檔案中，其他位置宣告的屬性或方法時，都必須要加 this，代表是這個 export default {} 的內部內容
                this.$refs.record.forEach(
                    ( record )=>{ // record 在這裡就是是子組件 export default {} 的實體
                        // 堆疊物件屬性，每個產品名稱都用來當作 key
                        // 順序很重要，重複的屬性，必須是由新的取代舊的屬性內容，反之，你會發現無法改變原本的資料內容
                        dataPackage = { ...dataPackage  , [record.fieldName]:record.fieldContent} ;
                        // console.log( 'DocList.line.113', record );
                });
                this.updateDataPackage = dataPackage ;
            },
            // 將資料儲存到 Firebase 中
            saveDataToFirebase(){
                this.setManyValueToDoc({ collection_name:my.myFirebaseCollection  , document_name:this.docName , dataPackage: this.updateDataPackage }  );
            }

        },

    };

</script>