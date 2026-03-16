<!-- 增加產品項目的模板，尚未完成外觀部分，但配合 DocList.vue 已有功能 -->
<template>
    <div class="container bg-secondary border border-danger">        
        <input type="text" v-model="fieldName" :title="fieldName" placeholder="請輸入欄位名稱">
        <div class="border border-warning">
            <!-- 
            $event.target.value 代表輸入方塊內容
            fieldContent 在這裡是物件，所以 ContentName 這個位置，就會是物件屬性名稱
            -->
            <input type="text" style="display: block;" v-for="( _ , ContentName ) in fieldContent" 
            :key="ContentName" :placeholder="'請輸入' + index2ChineseName(ContentName)"
            @input="updateInputBox( ContentName ,$event.target.value)" >
        </div>
        <!-- 這個 @click 事件，會以另一個自訂事件名稱，傳送到上層，上層再自訂處理程序內容 -->
        <button @click="showData">顯示資料</button>        
    </div>
</template>
<script>
    export default {
        data(){
            return{
                // 產品名稱
                fieldName: null ,//欄位名稱，用產品名稱當欄位名稱，也就是說產品越多種，欄位會越多

                // 產品規格，我規劃在這裡設定
                fieldContent: { //欄位內容，將產品的規格，欄位對應屬性(用 map 型態)，儲存在欄位中
                    name: null , //產品名稱
                    imgName: null , //產品影像名稱
                    in_price: null , //產品進貨價格
                    stock_qty: null , //產品庫存數量
                } ,                
            }
        },
        // 註冊元件能輸出的觸發事件名稱
        emits:[ 'dataComplete' ],
        methods:{
            //將屬性名稱，轉換成對應中文名稱
            index2ChineseName( keyName ){
                switch(keyName){
                    case 'name':
                        return '產品名稱';
                    case 'imgName':
                        return '產品影像名稱';
                    case 'in_price':
                        return '進貨價格';
                    case 'stock_qty':
                        return '庫存數量';
                }
            },

            // 將資料輸出到外部，讓外部處理儲存的邏輯
            // 注意!!  將 key 用變數取代，要加 [] 中括號
            showData(){
                const dataPackage= {[this.fieldName]:this.fieldContent}
                console.log( 'FieldList.line.44',dataPackage ); // 列印出物件資料
                // console.log( Object.keys( dataPackage )) ; //列印出一個 array 包含所有的 key
                // console.log( Object.keys( dataPackage )[0]) ; //列印第一個陣列的 key 值
                this.$emit('dataComplete', dataPackage )
            },
            // 將輸入方塊的內容，即時的寫入儲存位置
            updateInputBox( field ,value ){
                this.fieldContent[field] = value ;
                console.log( this.fieldContent[field] ) ;
            }
        },
    }
</script>