<!-- 產品項目展示用模板 -->
<template>
    <!-- display 顯示成可水平排列並有寬度的元素樣式 -->
    <div class="item-panel" style="display: inline-block;" >
        <!-- bg-transparent 透明背景BS5類別 -->
        <div class="card bg-transparent">
            <!-- 以下面這個元素，當作其內部元素絕對定位的參考位置 -->
            <!-- 卡片主體，內容會被內縮 -->
            <div class="card-body position-relative ">
                <div class="position-absolute top-0 start-0 w-100">
                    <div class="position-relative">
                        <!-- 下面負責產品名稱及庫存顯示 -->
                        <h5 class="card-title">{{ productName }}</h5>
                        <div class="card-text" style="position: absolute ; top: 20px;"  > {{ productSpecName }} ( 現量: {{ productStocks }} )</div>                    
                        <!-- style="position: absolute ; top: 25px;"   style="position: absolute ; top: 23px; right: 0px;width: 50%;height: 25px;" -->
                        <!-- d-flex 設定內部元素都是彈性元素，justify-content-between 分散對齊 -->
                        <div class="w-100" style="position: absolute ; top: 45px;" >
                            <!-- position-absolute 讓元素(包含內部)變成絕對定位 top-0 貼齊上方 start-0 貼齊右邊 w-100 繼承父元素100%寬度 -->
                            <!-- 下面若沒有使用 ms-0 ，加入購物車按鈕會超出 div 左邊界 -->
                            <div class="d-flex ms-0 justify-content-between w-100" >
                                <!--  border border-danger border-1 用來確定元素邊界 -->
                                <div class="d-flex  justify-content-between w-50">                                    
                                    <button class="badge btn btn-secondary"  @click="decreaseQuantity" :disabled="productOrderQuantity < 1">－</button>
                                    <span class="">{{ productOrderQuantity }}</span>
                                    <button class="badge btn btn-secondary" @click="increaseQuantity" :disabled="productOrderQuantity >= productStocks">＋</button>
                                </div>
                                <!-- 下面放 "加入購物車" 按鈕及訂購數量調整按鈕 -->
                                <button class="badge btn btn-outline-primary zindex-10"   @click="addToCart">加入購物車</button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 設定卡片影像 ( v-bind:src 等於 :src ) -->
                <img :src="imgNameToFile(productImage)" class="card-img-bottom" alt="產品影像">                  
                
                <!-- 如果不用背景，按鈕字體並不明顯 -->
                <!-- 下面是放 "加入購物車" 按鈕的背景 -->
                <div style="z-index: 0;
                /* z-index 是影像堆疊索引，值越大越上層，越會蓋住別人 */
                /* 
                   要使用絕對定位設定 左left、上top、右right、下bottom邊 界位置，
                   如果沒有設定過 relative 的父容器，則會使用 body 當作絕對位移參考位置
                */
                position: absolute ;top: 45px;right: 0px;
                width: 76px;height: 23px;
                background-color:brown;
                border-radius: 6px;
                color: brown;"></div>
                
              

            </div>
            <!-- {{ productImage }} 測試圖片名稱使用 -->
        </div>
    </div>
</template>

<script>
// import * as my from '../../myCollection' ;
import {productImgNameToImgFile} from '../../myCollection' ;

    export default {
        data() {
            return {
                // image: my.images , // 替換為您的產品影像 URL
                // // productName: '產品名稱'
                // stock: 10, // 庫存數量
                // quantity: 1 // 預設訂購數量
                productOrderQuantity: 0
            };
        },
        emits:['orderProduct'],
        props:[ 'productImage' , 'productName' , 'productStocks' , 'productSpecName' ] ,
        methods: {
            increaseQuantity() {
                if (this.productOrderQuantity < this.productStocks) {
                    this.productOrderQuantity++;
                }
            },
            decreaseQuantity() {
                if (this.productOrderQuantity >= 1) {
                    this.productOrderQuantity--;
                }
            },
            addToCart() {
                alert(`已加入 ${this.productOrderQuantity} 個 ${this.productName} 到購物車`);
                this.orderProductItem();
            },
            imgNameToFile( imgName ){
                return productImgNameToImgFile( imgName ) ;
            },
            orderProductItem(){
                this.$emit("orderProduct",
                { productName:this.productName ,
                  productSpecName:this.productSpecName ,
                  productOrderQuantity:this.productOrderQuantity }
                );
            },
        },
    };


</script>

<style scoped>
.card {
    width: 200px; /* 使影像最大寬度為容器的 100% */
    
    height: auto;    /* 自動調整高度以保持比例 */
}
.item-panel:hover{
    
    box-shadow: 3px 3px 3px 3px rgba(70, 70, 70, 0.5);
    
}
.zindex-10{
    z-index: 10;
}
</style>