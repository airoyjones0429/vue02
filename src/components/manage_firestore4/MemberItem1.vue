<template>
  <div class="order-summary">
    <h2>訂單號: {{ order.orderNo }}</h2>
    <p>訂單金額: {{ order.orderAmount }}</p>
    <p>其他費用: {{ order.orderOtherFee1 }}</p>
    <p>總金額: {{ order.orderAllAmount }}</p>
    
    <h3>訂單明細</h3>
    <ul>
      <li v-for="(item, index) in order.orderDetial" :key="index">
        <div class="d-inline-block"><img :src="getImageUrl(item.orderImage)" alt="訂單圖片" /></div>        
        <div class="d-inline-block">項目名稱: {{ item.orderItemName }}</div>
        <div class="d-inline-block">數量: {{ item.orderItemNum }}</div>
        <div class="d-inline-block">單價: {{ item.orderPrice }}</div>
        <div class="d-inline-block">小計: {{ item.orderNItemPrice }}</div>
      </li>
    </ul>
  </div>
</template>

<script>
import {productImgNameToImgFile} from '@/myCollection'
export default {
  props: {
    order: {
      type: Object,
      required: true
    }
  },
  methods: {
    getImageUrl(imageName) {
      // 根據圖片名稱返回圖片的 URL，這裡假設圖片存放在 assets/images 目錄下
      return productImgNameToImgFile( imageName );
    }
  }
}
</script>

<style scoped>
.order-summary {
  border: 1px solid #ccc;
  padding: 16px;
  border-radius: 8px;
}
.order-summary img {
  max-width: 100px;
  height: auto;
}
</style>