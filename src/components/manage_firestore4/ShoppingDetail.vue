<!-- 使用者訂單檔案展示 -->
<template>
    <!-- 這個子組件，是透過路由指定，並使用命名路由讓同頁面顯示不同視圖，並直接在命名路由上 $emit() 出事件，因為要回到原本頁面關閉命名視圖 -->
    <div class="fix-background text-dark">
        <div class="center-div bg-primary">
            {{ getOrderDetailItemNumber }}
            <!-- 購物車有貨時，顯示 -->
            <div v-if="getOrderDetailItemNumber>0">
                <div v-for="(fieldContent , fieldName , mainIndex ) in getOrderNo" :key="fieldName">
                    <!-- 欄位內容是陣列，才使用明細方式顯示 -->
                    <div v-if="Array.isArray( fieldContent )== true" 
                        style="height: 300px; overflow-y:auto;">
                        <table class="bg-light w-100">
                            <thead style="position: sticky;top: 0px;">
                                <tr >
                                    <!-- 根據第一筆資料列印出標題列，fieldIndex 是欄位索引-->
                                    <!-- 增加自訂按鈕 delete 的標題空間 -->
                                    <th v-for="( _ , thFieldName ,  fieldIndex ) in { delete:'' ,...fieldContent[0]}" 
                                        :style="{'width' :  fieldWidth(thFieldName) , 
                                                 'textAlign' :   fieldIndex <= 3 ? 'center' : 'right' , 'padding-right' : '5px'  }"
                                        :key="thFieldName">
                                        {{ field2Chinese(thFieldName) }}
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <!-- 明細資料在這區塊顯示 -->
                                <tr v-for="(xfieldContent , xIndex ) in fieldContent" :key="xIndex">
                                    <!-- 增加自訂按鈕 delete 的按鈕空間 -->
                                    <td v-for="(xxfieldContent, _ , fieldIndex ) in { delete:'button' ,...xfieldContent} "
                                    :style="{ 'textAlign' :   fieldIndex <= 3 ? 'center' : 'right' ,
                                          'padding-right' : '5px' }"
                                    :key="fieldIndex">
                                        <!-- 要嘛!! 印出刪除列空白 -->
                                        <div v-if="xfieldContent == undefined || xfieldContent == null  "></div>
                                        <!-- 要嘛!! 印出按鈕 -->
                                        <button v-else-if="xxfieldContent=='button'"  @click="deleteOrderDetail( $event.currentTarget.id )"
                                         class="bi bi-trash-fill" ref="delete" :id="`delete${xIndex}`" ></button>
                                        <!-- 要嘛!! 印出影像 -->
                                        <img v-else-if="ImgNameToImgFile(xxfieldContent)"
                                         :src="ImgNameToImgFile(xxfieldContent)" alt="產品圖片" style="width:60px" >
                                        <!-- 要嘛!! 印出內容 -->
                                        <span v-else>{{ xxfieldContent }}</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div v-else>
                        <!-- 這區塊處理非陣列類型資料，訂單編號、合計、其他費用、總金額 -->
                        <div v-if="mainIndex==0">{{ field2Chinese(fieldName) }}：{{ fieldContent }}</div>
                        <div style="padding: 0% 12px;">
                            <!-- 用 BS5  row -> col- 排版 -->
                            <!-- 這裡也利用 Vue computed 計算屬性根據畫面寬度傳回不同的 BS5 樣式類別 -->
                            <div class="row table-foot" :title="mainIndex">
                                <div v-if="setRowColClass1!=''" :class="setRowColClass1"></div>
                                <div v-if="includeValue( mainIndex , [2,3,4] )" :class="setRowColClass2" >
                                    {{ field2Chinese(fieldName) }}
                                </div>
                                <div v-if="setRowColClass3!=''" :class="setRowColClass3"></div>
                                <div v-if="includeValue( mainIndex , [2,3,4] )" :class="setRowColClass4" >
                                    {{ fieldContent }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 有資料時要顯示的區塊 d-inline-block 為 BS5 樣式類別 -->
                <button class="d-inline-block" @click="arrangeOrderItem">整理明細資料</button>
                <button class="d-inline-block" @click="saveOrderDataToFirebase">儲存訂單</button>

            </div>

            <!-- 購物車空的，顯示 -->
            <div v-else>
                <p>您尚未購買任何物品，購物車空空地歐!!</p>
            </div>
            <button @click="backPage">回到賣場</button>
        </div>
    </div>
    
</template>
<script>
    import { mapGetters , mapActions} from 'vuex';
    import { field2OrderDetailFieldName , field2OrderDetailWidth ,productImgNameToImgFile } from '@/myCollection';
    export default {
        data(){
            // 為了能用推算屬性 computed 處理樣式問題，所以設定這個 screenWidth 屬性儲存目前畫面寬度
            return{
                screenWidth :window.innerWidth ,
            };
        },
        mounted(){
            // 為了可以持續更新 screenWidth 屬性值
            window.addEventListener('resize', this.updateScreenWidth );

            // 組件成功載入後，重新整理購物項目
            // this.arrangeOrderItem();  改在增加明細資料時處理
        },
        unmounted(){
            // 養成好習慣，沒用到的 Listener 要移除
            window.removeEventListener('resize' , this.updateScreenWidth );
        },
        emits:['toggleShowCar'],

        computed:{
            // 明細資料數量、訂單物件
            ...mapGetters(['getOrderDetailItemNumber','getOrderNo']),
            // 目前使用者
            ...mapGetters(['currentUser']),

            // 利用計算屬性，根據不同的寬度，產生不同的類別回應
            setRowColClass1(){
               if (this.screenWidth > 800 ){ return 'col-7';}
               else if( this.screenWidth > 400) { return 'col-6'; }
               else { return ''; }
            },
            setRowColClass2(){
               if (this.screenWidth > 800 ){ return 'col-2';}
               else if ( this.screenWidth > 400) { return 'col-3';}
               else { return 'col-6'; }
            },
            setRowColClass3(){
               if (this.screenWidth > 800 ){ return 'col-1';}
               else if ( this.screenWidth > 400){ return 'col-1';}
               else { return ''; }
            },
            setRowColClass4(){
               if (this.screenWidth > 800 ){ return 'col-2';}
               else if ( this.screenWidth > 400) { return 'col-2'; }
               else { return 'col-6'; }
            },                                    

        },
        watch:{
            getOrderDetailItemNumber:{
                handler(newVal){
                    console.log( 'ShoppingDetail-line-25',newVal );
                },
                deep: true ,
            }
        },
        methods:{
            // 清除訂單明細項目   儲存訂單資訊到指定會員文件中
            ...mapActions(['removeOrderDetail','setOrderDataToFirebase']),
            // 回到上一頁，要有使用 Vue-Router 才有這個功能
            backPage(){
                this.$emit('toggleShowCar'); //觸發事件，改變購物明細是否顯示的狀態
                this.$router.back();
            },
            field2Chinese( fieldName ){
                const number = '1234567.89'; // 練習將數值字串，變成容易閱讀的方式
                const formattedNumber = new Intl.NumberFormat('zh-TW').format(number);
                console.log(formattedNumber); // 輸出：1,234,567.89

                return field2OrderDetailFieldName( fieldName ) ;
            },
            fieldWidth( fieldName ){
                // console.log('ShoppingDetail-line-73' , Object.keys(thFieldName).length );
                return field2OrderDetailWidth(fieldName);
            },
            ImgNameToImgFile( imgName ){
                return productImgNameToImgFile( imgName );
            },
            deleteOrderDetail( buttonId ){
                const deleteItemIndex = buttonId.match(/\d+$/g)[0]  ;
                console.log( 'ShoppingDetail-line-97' , deleteItemIndex );
                // 注意!! removeOrderDetail() 是接收物件，當變數與物件名稱相同時，可以簡化成下面寫法
                this.removeOrderDetail( {deleteItemIndex} );
                console.log('ShoppingDetail-line-103' , this.getOrderNo ) ;
            },
            // 檢查 arr 陣列中，是否有 value，用來控制欄位的顯示
            includeValue( value , arr ){
                if(Array.isArray(arr)){
                     return arr.includes( value );
                }
                return false ;
            },
            // 更新網頁寬度 screenWidth 數據
            updateScreenWidth() {
                this.screenWidth = window.innerWidth;
            },
            // 整理明細資料重複的項目，將重複項目合併
            arrangeOrderItem(){
                // 注意!!  JS 物件及陣列 的設定 是設定記憶體位址
                const orderMainDetail = this.getOrderNo.orderDetail ;
                console.log('ShoppingDetail-line-178',orderMainDetail);

                // 產生合併重複的明細資料陣列
                const mergedOrderDetail = orderMainDetail.reduce(
                    (acc, current) => {
                    const existingItem = acc.find(item => item.orderItemName === current.orderItemName);
                    if (existingItem) {
                        existingItem.orderItemNum += current.orderItemNum; // 合併數量 注意!! 這裡會直接修改 VueX 狀態內容
                        existingItem.orderNItemPrice += current.orderNItemPrice ;
                    } else {
                        acc.push(current); // 新增項目
                    }
                    return acc;
                    // acc 初始值設定為 []
                }, []);
                
                // 更新訂單明細資料 ( 合併重複的項目，並累計數量與金額 )
                this.getOrderNo.orderDetail = mergedOrderDetail ;
                console.log('ShoppingDetail-line-191', mergedOrderDetail );
            },
            saveOrderDataToFirebase(){
                // { userEmail , orderData }
                this.setOrderDataToFirebase({ userEmail: this.currentUser.email , orderData : this.getOrderNo });
                console.log('ShoppingDetail-line-210');
            },

        },
    }

</script>
<style scoped>
    .fix-background{
        position: fixed;
        left: 0;top: 0;right: 0;bottom: 0;
        background-color: rgba( 0,0,0, 0.3 );
        z-index: 500;
    }
    .center-div{
        @media (min-width: 1200px) { /* 執行到最小寬度為 1201 px */
            position: fixed;
            left: 10%;
            right: 10%;
            top: 20%;        
            bottom: 20%;
        }

        @media (max-width: 1201px) { /* 執行到最大寬度為 1200 px */
            position: fixed;
            left: 7%;
            right: 7%;
            top: 20%;        
            bottom: 20%;            
        }

        @media (max-width: 991px) { /* 執行到最大寬度為 1200 px */
            position: fixed;
            left: 5%;
            right: 5%;
            top: 20%;        
            bottom: 20%;            
        }

        @media (max-width: 800px) { /* 執行到最大寬度為 800 px */
            position: fixed;
            left: 0%;
            right: 0%;
            top: 20%;        
            bottom: 20%;
            font-size:smaller;
        }



    }
    thead>tr{
        color: white;
        background-color: rgb(148, 95, 25);
    }
    tbody>tr:hover {
        background-color: rgb(252, 242, 155);
    }

    /* 金額的欄位樣式 */
    .money{
        text-align: right;
        padding-right: 5px;
    }
    .table-foot{
        background-color: rgb(121, 149, 201);
        color: black;
        font-size: larger;
    }
</style>