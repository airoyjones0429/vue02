import { db } from './firebase'; // 引入 Firebase Auth 及 GoogleAuthProvider
// import { signInWithEmailAndPassword, signOut , signInWithPopup } from 'firebase/auth';

import { 
        // getFirestore, 
        // collection, 
        // addDoc , 
        doc , 
        // setDoc , 
        // Timestamp , 
        updateDoc ,
        // serverTimestamp ,
        // arrayUnion, 
        // arrayRemove ,
        // increment ,
        runTransaction ,
        // deleteField ,
        // getDoc ,
        // getDocFromCache 

} from "firebase/firestore";


// 載入自訂集合資料檔案
// import { orderMainObject , orderDetailObject } from "./myCollection";
import { orderMainObject , myFirebaseUserShopping } from "./myCollection";

// 登入用戶目前的購物車清單，目前先用 localStorage 暫存在瀏覽器中
const orderModule = {
    // 購物車應有內容
    state(){
        return{
            orderMain: null ,
            orderDetailItemNumber: 0 , // 紀錄明細數量
            orderButtonClick:0, //控制訂購動畫
            userOrderData: null , // 使用者的訂購資訊 (使用者資料、訂購資料...)
        };
    },
    mutations:{
        // 設定購物車內容
        setOrderMain(state , orderMain ){
            state.orderMain = { ...state.orderMain , ...orderMain } ;
        },
        // orderOneDetail 只代表一項產品
        createOrderMain(state , {orderOneDetail , orderNo}){
            const orderM = orderMainObject ;
            let orderD = orderOneDetail ;
            let orderAmt = 0 ;
            
            if( orderM.orderNo==''){
                // 設定訂單名稱
                orderM.orderNo = orderNo;
                console.log('orderModule-line-24' , orderNo);
            }

            orderM.orderDetail.push( orderD );
            orderM.orderDetail.forEach( item => {
                orderAmt += item.orderNItemPrice ;
            });
            // 計算總金額
            orderM.orderAmount = orderAmt ;
            
            // 紀錄最新明細數量
            state.orderDetailItemNumber = orderM.orderDetail.length ;
            state.orderMain = orderM ;
        },
        // 刪除明細項目
        deleteOrderDetail(state , deleteItemIndex ){
            // 移除刪除項目的小計金額
            let dNPrice = state.orderMain.orderDetail[deleteItemIndex].orderNItemPrice ;
            state.orderMain.orderAmount -= dNPrice ;

            // 刪除陣列元素、與刪除物件指令相同
            delete state.orderMain.orderDetail[deleteItemIndex] ; // 將指定位置設為 undefine
            state.orderMain.orderDetail.splice( deleteItemIndex , 1 ) ; // 將指定元素索引的元素移除
            state.orderDetailItemNumber = state.orderMain.orderDetail.length ; // 更新明細資料數量

            //清除訂單編號 條件
            if ( state.orderDetailItemNumber == 0 ){
                state.orderMain.orderNo='';
            }

            console.log('orderModule-line-38' , state.orderMain.orderDetail) ;
        },
        // 儲存訂單資料到 firebase 中
        async saveOrderData( state , { userEmail , orderData }){           
            
            // 讀取文件
            // 固定使用 myFirebaseUserShopping 集合，並用使用者的 Email 當作購物資訊的文件名稱
            const LoadDocRef = doc( db , myFirebaseUserShopping , userEmail );

            try{
                // 注意!! 必須是先讀取  後寫入  才是 Firebase TransAction 處理順序
                await runTransaction( db ,
                    async ( transaction ) => {
                        console.log('orderModule-line-96');
                        let fetchData = await transaction.get( LoadDocRef );
                        console.log('orderModule-line-98');
                        if ( !fetchData.exists() ){
                            throw "使用者購物文件不存在!! 確定使用者是否正常登入!!" ;
                        }
                        // 將購物資訊暫存在本地端
                        console.log('orderModule-line-103');
                        state.userOrderData = fetchData.data();

                        // 注意!! Firebase 無法直接用自訂物件的方式儲存資料
                        // 但允許將資料讀出來後，再放到物件中，最後儲存到物件陣列中，所以衍生出下面程序
                        let tempDetailList = [];
                        let tempDetailItem = {};
                        // 陣列型態，才能直接使用 forEach() 方法
                        orderData.orderDetail.forEach( 
                            item => {
                                console.log('orderModule-line-113',item);
                                tempDetailItem={}
                                // 物件型態，才能這樣取出物件屬性名稱，並設定其內容
                                Object.keys( item ).forEach(
                                    key => {
                                        tempDetailItem[key]=item[key];
                                    }
                                );
                                tempDetailList.push( tempDetailItem );                              

                            }
                        );

                        // tempDetail.push( orderData.orderDetail[0] );
                        // console.log('orderModule-line-106' , orderData.orderDetail[0] );

                        // 將訂購單以欄位名稱儲存在 購物文件中
                        await updateDoc( LoadDocRef , 
                            {
                                // 用訂單編號當作欄位名稱，將訂單物件儲存在該欄位中
                                [orderData.orderNo]: { 
                                    orderNo: orderData.orderNo ,
                                    orderAmount:orderData.orderAmount,
                                    orderOtherFee1:orderData.orderOtherFee1,
                                    orderAllAmount:orderData.orderAllAmount,
                                    orderDetial: tempDetailList,
                                }
                            }
                        );
                        // console.log( 'orderModule-line-107 ',orderData);
                    }
                );

            }catch(e){
                console.log( 'orderModule-line-96' , e) ;

            }
        },
    },
    actions:{
        createOrderNo({commit} , { orderMainObject }){
            console.log('orderModule-line-19');
            commit('setOrderMain' , orderMainObject ) ;
        },
        createOrderDetail( context , { orderOneDetail , orderNo}){
            console.log('orderModule-line-35' , orderNo);
            context.commit('createOrderMain' ,{ orderOneDetail , orderNo}) ;

            // 用 dispatch() 方法調用 其他 VueX Action
            context.dispatch('arrangeOrderItem');
        },
        removeOrderDetail({commit} , { deleteItemIndex }){
            console.log('orderModule-line-50');
            commit('deleteOrderDetail', deleteItemIndex );
        },

        // 整理明細資料重複的項目，將重複項目合併
        arrangeOrderItem( context ){
            // 注意!!  JS 物件及陣列 的設定 是設定記憶體位址
            const orderMain = context.state.orderMain ;
            // console.log('orderModule-line-81',orderMain); //ok
            // console.log('orderModule-line-82', Array.isArray( orderMain.orderDetail));
            // console.log('orderModule-line-83',orderMain.orderDetail);
            const orderDetail = orderMain.orderDetail ;


            const mergedOrderDetail = orderDetail.reduce(
                (acc, current) => {
                const existingItem = acc.find(item => item.orderItemName === current.orderItemName);
                if (existingItem) {
                    existingItem.orderItemNum += current.orderItemNum; // 合併數量 注意!! 這裡會直接修改 VueX 狀態內容
                    existingItem.orderNItemPrice += current.orderNItemPrice ;
                } else {
                    acc.push(current); // 新增項目
                }
                return acc;
            }, []);
            
            // 更新明細項目，已合併重複項目
            // 更新項目數量
            context.state.orderMain.orderDetail = mergedOrderDetail ;
            context.state.orderDetailItemNumber = mergedOrderDetail.length ;

            console.log('orderModule-line-101', mergedOrderDetail.length );
        },
        
        // 當有按下訂購按鈕時，累計按下次數，用來控制訂購時，購物車的動畫
        // 目前沒有變數上限保護措施
        clickAnyOrderButton({state}){
            state.orderButtonClick++;
        },
        // 儲存訂購資料到指定會員文件中 
        setOrderDataToFirebase({commit} , { userEmail , orderData }){
            commit('saveOrderData', { userEmail , orderData } );
        }
    },
    getters:{
        getOrderNo(state){
            return state.orderMain ;
        },
        getOrderDetailItemNumber(state){
            return state.orderDetailItemNumber ;
        },
        getOrderState(state){
            return !!state.orderMain ;
        },
        getOrderButtonClick(state){
            return state.orderButtonClick ;
        },
    }
}

export default orderModule ;