<template>
    <div class="container mt-5">
        <!-- 以下面這個元素，當作其內部元素絕對定位的參考位置 -->
        <div class="card position-relative bg-transparent">
            <div class="card-body">
                <img :src="image.car01" class="card-img-top " alt="產品影像">

                <!-- 下面負責產品名稱及庫存顯示 -->
                <div class="position-absolute top-0 start-0 w-100">
                    <h5 class="card-title d-inline-block">{{ productName }}</h5>
                    <p class="card-text d-inline-block">( 現量: {{ stock }} )</p>                    
                </div>
                
                <!-- position-absolute 讓元素(包含內部)變成絕對定位 top-0 貼齊上方 start-0 貼齊右邊 w-100 繼承父元素100%寬度 -->
                <!-- 下面放 "加入購物車" 按鈕及訂購數量調整按鈕 -->
                <div class="position-absolute top-0 start-0 w-100">
                    <button class="badge btn btn-outline-primary d-block" style="position: absolute ; top: 25px;" @click="addToCart">加入購物車</button>
                    <div class="d-flex justify-content-between" style="position: absolute ; top: 23px; right: 0px;width: 50%;height: 25px;"  >
                        <button class="badge btn btn-secondary"  @click="decreaseQuantity" :disabled="quantity <= 1">－</button>
                        <span>{{ quantity }}</span>
                        <button class="badge btn btn-secondary" @click="increaseQuantity" :disabled="quantity >= stock">＋</button>
                    </div>
                </div>
                
                <!-- 下面是放 "加入購物車" 按鈕的背景 -->
                <div style="z-index: -1;top: 25px;
                left: 0px;position: absolute ;
                width: 76px;height: 22px;
                background-color:brown;
                border-radius: 6px;
                color: brown;">1</div>

            </div>
        </div>
    </div>
</template>

<script>
import * as my from '../../myCollection' ;
    export default {
        data() {
            return {
                image: my.images , // 替換為您的產品影像 URL
                productName: '產品名稱',
                stock: 10, // 庫存數量
                quantity: 1 // 預設訂購數量
            };
        },
        props:[] ,
        methods: {
            increaseQuantity() {
                if (this.quantity < this.stock) {
                    this.quantity++;
                }
            },
            decreaseQuantity() {
                if (this.quantity > 1) {
                    this.quantity--;
                }
            },
            addToCart() {
                alert(`已加入 ${this.quantity} 個 ${this.productName} 到購物車`);
            }
        },
    };


</script>

<style scoped>
.card {
    width: 200px; /* 使影像最大寬度為容器的 100% */
    
    height: auto;    /* 自動調整高度以保持比例 */
}
</style>