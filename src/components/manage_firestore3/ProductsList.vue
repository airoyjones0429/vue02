<template>
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
    <product-item3   v-for="( RecordContent , RecordName ) in updateDataPackage"  :key="RecordName" :title="RecordName" 
        :product-image="RecordContent.imgName"  :product-name="RecordName" :product-spec-name="RecordContent.name"
        :product-stocks="RecordContent.stock_qty" :product-order-quantity="0" 
        :product-sale-price="RecordContent.sale_price"
        @order-product="( obj )=> { console.log(obj);}"
        />
</template>
<script>
// import { mapGetters } from 'vuex';
import ProductItem3 from './ProductItem3.vue';
export default {
    components:{
        ProductItem3,
    },
    computed:{
        // 從 Vuex 狀態管理 $store 物件 getters 直接取出 getProduction 的傳回值
        updateDataPackage:{
            get(){
                return this.$store.getters.getProduction ;
            }
        }
    },

}

</script>