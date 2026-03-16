<!-- 這個組件要搭配 mainScreen4.vue 一起使用 -->
<template>

    <!-- 購物車圖示 會固定在畫面上 -->
    <div ref="shoppingCar" class="fixed-bottom-right">
        <i ref="infoIcon" class="bi bi-info-circle blinkCarRed fixed-button-top rounded "></i>
        <i ref="copyIcon" class="bi bi-info-circle blinkCarYellow fixed-button-top rounded "></i>
        <button class="navbar navbar-toggler rounded bi bi-cart4 w-100 h-100" @click="clickShoppingCarButton"></button>
    </div>

</template>
<script>
import { mapGetters } from 'vuex';
// 下面變數 motionName() 動畫控制使用
let clickAddIndex = 0 ;
let clickAddNum = 0 ;

    export default {
        // 切換 顯示/不顯示 購物車明細事件
        emits:['toggleShowCar'],
        computed:{
            ...mapGetters(['getOrderDetailItemNumber','getOrderButtonClick']),
        },
        watch:{
            // 注意!! 這裡監控訂購的項目數量，不是單項目數量
            getOrderDetailItemNumber(newVal,oldVal){
                console.log('ShoppingCar-line-18',newVal) ;
                // 新增訂購項目時，顯示動畫
                if (newVal > oldVal){
                    this.motionNameForElement( this.$refs.shoppingCar , this.$refs.infoIcon , this.$refs.copyIcon ,'upupup');
                }
            },
            getOrderButtonClick(){
                console.log('ShoppingCar-line-34')
                this.motionNameForElement( this.$refs.shoppingCar , this.$refs.infoIcon , this.$refs.copyIcon ,'upupup');                
            },
        },
        methods:{
            // 當按下購物車按鈕時，觸發 toggleShowCar 事件，並跳轉 shoppingCar 命名路由
            clickShoppingCarButton(){
                console.log( 'ShoppingCar-line-31');
                this.$emit('toggleShowCar');
                this.$router.push({name:'shoppingCar'});
            },
            // 傳入觸發事件的元素物件及動畫類別名稱
            motionNameForElement( divElement , infoElement ,copyElement , animationName ){
                // 設定臨時產生的元素，要附加在哪個容器上，這樣元素就會在容器中展現動畫
                const targetDiv = divElement 

                // 用觸發事件物件中的 img元素，當作重複顯示的影像
                const targetImg = copyElement ;
                
                // // 完全複製 obj 元素，除了 CSS 類別
                let newObj = targetImg.cloneNode() ;
                newObj.id= `${newObj.id}${++clickAddIndex}` ;
                clickAddNum++ ;
                // console.log( 'ShoppingCar-line-41',newObj.id );
                newObj.classList.add(animationName); // 加入指定的動畫效果

                // console.log('ShoppingCar-line-49', targetImg.classList );

                // // 撥放動畫完成後，執行將動畫 CSS 類別移除
                newObj.addEventListener('animationend', () => {
                    // console.log('remove', clickAddNum--); // 臨時的動畫元素數量
                    clickAddIndex = clickAddNum != 0 ? clickAddIndex : 0 ; //管理產生的影像數量及索引值
                    // newObj.classList.remove( animationName ); //從類別清單移除特定樣式類別，此行算多餘的
                    newObj.remove(); //元素自己移除自己
                    // console.log('clickAddIndex', clickAddIndex);
                    targetImg.classList.toggle('blinkCarYellow');
                    targetImg.classList.toggle('blinkCarRed');
                    infoElement.classList.toggle('blinkCarYellow');
                    infoElement.classList.toggle('blinkCarRed');                    
                });
                // 絕對定位節點，會往上找到第一個相對定位節點，並根據該節點控制，left、top、right、bottom 任二種屬性，可達到定位在想要的位置
                // 如果要某元素固定在特定位置，該元素就要使用絕對定位
                newObj.style.position = 'absolute'; // 設定為絕對定位 absolute  不然會參位置會變動
                newObj.style.right = '-2px';
                newObj.style.height = '20px';
                
                // newObj.style.left = '0px' ; //設定 auto  會排在原始影像後面
                // newObj.style.width= '100%' ;
                newObj.style.zIndex = 0 ;
                targetImg.style.zIndex = clickAddIndex + 1 ;
                // clickAddIndex++;clickAddNum++;
                // // 將影像加入到另一個容器
                targetDiv.appendChild(newObj);
                // console.log( targetDiv.classList );
            }
        }

    }

</script>


<style scoped>
    /* 往下漂浮效果 */
    .upupup  {
    position: absolute;
    animation-name: example15;
    animation-duration: 1s;  
    animation-fill-mode: forwards; /* 動畫結束後，保持最後狀態 */  
    }
    @keyframes example15 {
    from {  top: -200px;
            background-color: rgba(255,0 ,0 , 0); 
            /* color: rgba(255,255 ,255 , 0); */
            opacity: 0; /* 影像，完全不透明 */}
    to {    top: -10px;  
            background-color: rgba(255,0 ,0 , 1);
            /* color: rgba(255,255 ,255 , 1); */
            opacity: 1; /* 完全透明 */}
    }

    .blinkCarYellow {
        transition: background-color 1s ;
        background-color: yellow;
    }
    .blinkCarRed {
        transition: background-color 1s ;
        background-color: red;
    }    

</style>