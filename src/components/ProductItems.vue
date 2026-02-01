<template>
    <!-- 產品單一項目模板 -->

    <!-- id="env" 這個容器顯示效果為彈性顯示 -->
    <div id="env" class="d-flex flex-wrap border-5 border-info text-center">
        <!-- 這裡開始是 BS5 卡片類別樣式的開頭 start ，必須用 w-100 不然元素不會跟著上層變大-->
        <div class="card bg-secondary border border-2 w-100">
            <img id="main-img" class="card-img-top" :title="'Card image'" :src="imgItem" :alt="'Card image'">
            <div class="card-body">
                <div class="card-title h5">
                  <div>金額：{{ price }}</div>
                  <div>庫存：{{ orderNumber }}</div>
                  <div>訂購數量：{{ orderNumber }}</div>
                  
                </div>
                <!-- 使用可伸縮的容器，將按鈕分散對齊 -->
                <div class="d-flex justify-content-around mt-3 bg-light rounded w-100">
                    <!-- 要注意，"減" 動態影像是加入在下面的 btnSub 中，所以該元素必須設定為相對位置 -->
                    <button :id="'btnSub' + this.index" type="button" class="btn btn-outline-success" @click="btnSub($event)"  style="position: relative;width: 40%;">
                        <img :src="imgSub" alt="imgSub"  style="width: 100% ">    
                    </button>
                    <!-- <div class="de" style="position: relative;width: 30%;"> -->
                        <!-- 如果 "加" 動態元素加在入在這裡的 div (class=de) ，則該動態元素層級會高於下面的 button 元素，用 zIndex CSS 的層級控制也沒用，
                        所以之後改，加在 button 中，雖然這樣很怪，因為 button 很少當容器使用 -->
                        <button :id="'btnPlus'+ index" type="button" class="btn btn-outline-danger"   @click="btnPlus($event)" style="position: relative;width: 40%;">
                            <!-- button 中的影像不能用 position = absolute ，影像會跑出按鈕!? -->
                            <img :src="imgAdd" alt="imgAdd" style="width: 100% ">
                        </button>
                    <!-- </div> -->
                </div>
            </div>
        </div>
        <!-- 這裡開始是 BS5 卡片類別樣式的結尾 end -->
    </div>    
</template>
<script>
    let clickAddIndex = 0 ;
    let clickAddNum = 0 ;
    export default {
        data(){
            return{
                orderNumber:0 ,
            }
        },
        props:[ 'imgItem' , 'imgAdd' , 'imgSub' , 'index' , 'price' ],
        methods:{
            btnSub( event ){
                console.log( 'btnPlus' ,event.target ); //點到的目標
                console.log( event.currentTarget ); //實際發生事件的目標
                console.log( '-----------------------' ); //實際發生事件的目標
                this.orderNumber--;             
                this.orderNumber= this.orderNumber>0? this.orderNumber : 0 ;
                this.motionName( event , 'downdown' );
            },
            btnPlus( event ){
                console.log( 'btnPlus' ,event.target ); //點到的目標
                console.log( event.currentTarget ); //實際發生事件的目標
                console.log( '-----------------------' ); //實際發生事件的目標
                this.orderNumber++;
                this.motionName( event , 'upup' );
            },
            // 傳入觸發事件的元素物件及動畫類別名稱
            motionName( event , animationName ){
                // .closest('div') 可以找到最接近節點的 div 元素，closest() 也可以用 CSS 選擇方式尋找文件節點
                const targetElementBtn = event.currentTarget //.closest('div') ;

                // 用觸發事件物件中的 img元素，當作重複顯示的影像
                const targetImg = event.currentTarget.querySelector('img') ;
                
                // // 完全複製 obj 元素，除了 CSS 類別
                let newObj = targetImg.cloneNode() ;
                newObj.id= `${newObj.id}${++clickAddIndex}` ;
                clickAddNum++ ;
                console.log( newObj.id );
                newObj.classList.add(animationName); // 加入指定的動畫效果
                // // 撥放動畫完成後，執行將動畫 CSS 類別移除
                newObj.addEventListener('animationend', () => {
                    console.log('remove', clickAddNum--);
                    clickAddIndex = clickAddNum != 0 ? clickAddIndex : 0 ; //管理產生的影像數量及索引值
                    // newObj.classList.remove( animationName ); //從類別清單移除特定樣式類別，此行算多餘的
                    newObj.remove(); //元素自己移除自己
                    console.log('clickAddIndex', clickAddIndex);
                });
                // 絕對定位節點，會往上找到第一個相對定位節點，並根據該節點控制，left、top、right、bottom 任二種屬性，可達到定位在想要的位置
                // 如果要某元素固定在特定位置，該元素就要使用絕對定位
                newObj.style.position = 'absolute'; // 設定為絕對定位 absolute  不然會參位置會變動
                newObj.style.left = '0px' ; //設定 auto  會排在原始影像後面
                newObj.style.width= '100%' ;
                newObj.style.zIndex = 0 ;
                targetImg.style.zIndex = clickAddIndex + 1 ;
                // clickAddIndex++;clickAddNum++;
                // // 將影像加入到另一個容器
                targetElementBtn.appendChild(newObj);
                console.log( targetElementBtn.classList );
            }
        },
    }

</script>
<style scoped>


    /* 往上漂浮效果 */
    .upup  {
    position: absolute; /* 動畫上，這裡改成 relative 也沒有差別... */
    animation-name: example15;
    animation-duration: 3s;  
    animation-fill-mode: forwards; /* 動畫結束後，保持最後狀態 */  
    }
    @keyframes example15 {
    from {  bottom: 0px;  
            /* background-color: rgba(255,0 ,0 , 1);  */
            color: rgba(255,255 ,255 , 1);
            opacity: 1; /* 影像，完全不透明 */}
    to {    bottom: 100px;  
            /* background-color: rgba(255,0 ,0 , 0); */
            color: rgba(255,255 ,255 , 0);
            opacity: 0; /* 完全透明 */}
    }
    
    /* 往下漂浮效果 */
    .downdown  {
    position: relative;
    animation-name: example16;
    animation-duration: 3s;  
    animation-fill-mode: forwards; /* 動畫結束後，保持最後狀態 */  
    }

    @keyframes example16 {
    from {  top: -100px;  
            /* background-color: rgba(255,0 ,0 , 1);  */
            color: rgba(255,255 ,255 , 1);
            opacity: 1; /* 影像，完全不透明 */}
    to {    top: 0px ;  
            /* background-color: rgba(255,0 ,0 , 0); */
            color: rgba(255,255 ,255 , 0);
            opacity: 0; /* 完全透明 */}
    }



/**
 * 
 */

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