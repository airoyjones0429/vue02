<!-- 產品列表，使用組件 ProductItem4.vue -->
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
    <product-item4   v-for="( RecordContent , RecordName ) in updateDataPackage"  :key="RecordName" :title="RecordName" 
        :product-image="RecordContent.imgName"  :product-name="RecordName" :product-spec-name="RecordContent.name"
        :product-stocks="RecordContent.stock_qty" :product-order-quantity="0" 
        :product-sale-price="RecordContent.sale_price"
        @order-product="orderProduct"
        />
</template>
<script>
import { mapGetters , mapActions } from 'vuex';
import ProductItem4 from './ProductItem4.vue';
import { orderDetailObject } from '@/myCollection';

export default {
    components:{
        ProductItem4,
    },
    computed:{
        // 從 Vuex 狀態管理 $store 物件 getters 直接取出 getProduction 的傳回值
        updateDataPackage:{
            get(){
                return this.$store.getters.getProduction ;
            }
        },
        ...mapGetters(['getOrderState','getOrderNo','currentUser']),
    },
    
    methods:{
        ...mapActions(['createOrderDetail','clickAnyOrderButton']),
        // 增加訂購明細資料
        orderProduct( obj ){
            // console.log('ProductsList4-line-39',obj);
            let orderOneDetail = new orderDetailObject ;
            orderOneDetail.orderItemName = obj.productName ;
            orderOneDetail.orderImage =  obj.productImage  ;
            orderOneDetail.orderItemNum = parseInt( obj.productOrderQuantity ) ;
            orderOneDetail.orderPrice = parseInt( obj.productSalePrice );
            orderOneDetail.orderNItemPrice = orderOneDetail.orderItemNum * orderOneDetail.orderPrice ;
            // console.log( 'ProductsList4-line-44',orderOneDetail );
            // 在 VueX 中產生訂單的明細資料
            this.createOrderDetail( {orderOneDetail:orderOneDetail ,orderNo: this.myOrderNo() });
            // console.log('ProductsList4-line-47',this.myOrderNo());
            console.log('ProductsList4-line-53');
            this.clickAnyOrderButton();
        },
        // 取得訂購單號
        myOrderNo(){
            const userName = this.currentUser.email.split('@');
            console.log('ProductsList4-line-55',userName[0]);
            // 2026 年推出的新時間物件，這裡還沒辦法使用，之後看能不能解決
            // 目前先用 Date() 舊的時間物件處理
            const years = new Date().getFullYear().toString();
            let months = (new Date().getMonth()+1).toString();
            months = '0'.charAt(months.length-1) + months ;
            let days = new Date().getDay().toString();
            days = '0'.charAt(days.length-1) + days;
            let hours = new Date().getHours().toString();
            hours = '0'.charAt(hours.length-1) + hours;
            let minutes = new Date().getMinutes().toString();
            minutes = '0'.charAt(minutes.length-1) + minutes;
            let seconds = new Date().getSeconds().toString();
            seconds = '0'.charAt(seconds.length-1) + seconds;
            return `${userName[0]}R${years}${months}${days}${hours}${minutes}${seconds}` ;
        }

    },
    
    

}

</script>