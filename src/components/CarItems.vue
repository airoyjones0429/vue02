<template>
    <!-- 汽車項目清單 -->

    <div title="請按下 F12 後，在按下按鈕測試">
      <button @click="fetchCarData">抓取 Firebase 練習資料</button>
      <button @click="setNewItemInFieldOnDoc({ 
            collection_name:'websell' , 
            document_name:'production' , 
            field_name:'car' , 
            data_content: {name:'車子3',imgName:'car01'} })">
            新增資料 特定資料 練習
            </button>
    </div>
    <!-- id="env" 這個容器顯示效果為彈性顯示 -->
    <div id="env" class="d-flex flex-wrap border-5 border-info text-center">
        <!-- car 為自訂變數名稱，固定用 index 用來取得清單的索引值，可以不用索引值，去掉小括號()即可 -->
        <div v-for="(car,index) in imgList" :key="car" class="card bg-primary border border-2">
            <div class="carItems" :title="index">
                <product-items :img-item="car" :imgAdd="imgUp" :imgSub="imgDown" :index="index" />
            </div>
        </div>
    </div>
</template>
<script>
    // 在每個子組件，匯入所有的影像，這不是好的做法
    // 已改在上層組件匯入，不然子組件渲染一次，就會重複匯入資源一次
    import imgUp from '@/assets/up.png' ;
    import imgDown from '@/assets/down.png' ;
    import car01 from '@/assets/car01.png' ;
    import car02 from '@/assets/car02.png' ;
    import car03 from '@/assets/car03.png' ;
    import car04 from '@/assets/car04.png' ;
    import car05 from '@/assets/car05.png' ;
    import car06 from '@/assets/car06.png' ;
    import car07 from '@/assets/car07.png' ;
    import car08 from '@/assets/car08.png' ;
    import car09 from '@/assets/car09.png' ;
    import car10 from '@/assets/car10.png' ;
    import car11 from '@/assets/car11.png' ;
    import car12 from '@/assets/car12.png' ;
    import car13 from '@/assets/car13.png' ;
    import car14 from '@/assets/car14.png' ;
    import car15 from '@/assets/car15.png' ;
    import car16 from '@/assets/car16.png' ;
    import { mapActions , mapGetters } from 'vuex';

    export default {
        data(){
            return {
                imgUp : imgUp ,
                imgDown : imgDown ,
                imgList: [ car01 , car02 , car03 , car04 , car05 , car06 , car07 , car08 , car09 , car10 , car11 , car12 , car13 , car14 , car15 , car16 ] ,
            }
        },
        methods:{
          ...mapActions(['fetchProductsFromFirebase']),
          ...mapActions(['setNewItemInFieldOnDoc']),
          fetchCarData(){
            this.fetchProductsFromFirebase({ collection_name:'websell' , document_name:'production' })
          },
          getCarData(){
            console.log( this.getProduction);            
          }
        },
        computed:{
          ...mapGetters(['getProduction']),
        },
    }
</script>

<style scoped>

      /* 畫面最大寬度到最小寬度 1200px 的設定 */
      @media screen and (min-width:1200px) {
        .carItems{
          width: 219px;
        }
      }

      /* 畫面最大寬度到最小寬度 1400px 的設定 */
      @media screen and (min-width:1400px) {
        .carItems{
          width: 212px;
        }
      }



      /* 畫面最小寬度到最大寬度 1200px 的設定 */
      @media screen and (max-width:1200px) {
        .carItems{
          width: 229px;
        }
      }

      /* 畫面最小寬度到最大寬度 990 的設定 */
      @media screen and (max-width:990px) {
        .carItems{
          width: 169px;
        }
      }        
      
      /* 畫面最小寬度到最大寬度 768 的設定 */
      @media screen and (max-width:768px) {
        .carItems{
          width: 167px;
        }
      } 

      /* 畫面最小寬度到最大寬度 576 的設定 */
      @media screen and (max-width:576px) {
        .carItems{
          width: 174px;
        }
      }

      /* 畫面最小寬度到最大寬度 575 的設定 */
      @media screen and (max-width:575px) {
        .carItems{
          width: 170px;
        }
      }      

      /* 畫面最小寬度到最大寬度 560 的設定 */
      @media screen and (max-width:560px) {
        .carItems{
          width: 165px;
        }
      }
      /* 畫面最小寬度到最大寬度 545 的設定 */
      @media screen and (max-width:545px) {
        .carItems{
          width: 240px;
        }
      }
      /* 畫面最小寬度到最大寬度 545 的設定 */
      @media screen and (max-width:527px) {
        .carItems{
          width: 420px;
        }
      }             
</style>