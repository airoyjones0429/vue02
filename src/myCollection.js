// 這裡設定使用的集合及文件名稱
// 集合名稱必須事先知道，Firebase 沒提供 API 自動化讀取所有集合名稱
// 在這裡設定這個 App 使用 Firebase 的集合名稱，這裡只使用一個集合，根據設計規劃，可以有多個集合
export const myFirebaseCollection = 'websell';
export const myFirebaseUserShopping = 'userShoppingData';  // 使用者資訊儲存文件，直接儲存在這個集合中，第二個集合名稱

// myFirebaseCollection 所有文件名稱，都會在這裡設定
export const myCollectionDoc = { 
    // ./components/manage_firestore/ 中，使用的文件名稱
    product: 'production' ,
    // ./components/manage_firestore 1~4 / 中，使用的文件名稱
    product1 : 'products' ,
} ;

// myFirebaseUserShopping 文件是動態產生的，必須動態指定

//產品的規格，統一在這裡設定，如果要增加欄位，就在這裡增加，除非新建立的資料，不然移除舊欄位，
export const myProductContentFields = { 
        name: null , //產品名稱
        imgName: null , //產品影像名稱
        in_price: null , //產品進貨價格
        sale_price: null , //產品進貨價格
        stock_qty: null , //產品庫存數量
    };


// 將欄位名稱轉為中文名稱
export function index2ChineseName( keyName ){
    switch(keyName){
        case 'name':
            return '規格名稱';
        case 'imgName':
            return '影像名稱';
        case 'in_price':
            return '進貨價格';
        case 'stock_qty':
            return '庫存數量';
        case 'sale_price':
            return '銷售金額';
        case 'updated':
            return '資料變更'
        default :
            return `請到 myCollection.js 設定 ${keyName}` ;
    }
}

// 在 HTML 中，<input> 元素的 type 屬性可以設定多種不同的值，以便創建不同類型的輸入欄位。以下是一些常見的 type 值：

// 1. 文本類型
// text: 單行文本輸入。
// password: 密碼輸入，顯示為隱藏字符。
// email: 用於輸入電子郵件地址，會進行基本的格式驗證。
// url: 用於輸入網址，會進行基本的格式驗證。
// search: 用於搜索框，通常會有特殊的樣式。

// 2. 數字類型
// number: 數字輸入，可以設定最小值和最大值。
// range: 滑動條，用於選擇數值範圍。

// 3. 日期和時間類型
// date: 日期選擇器，顯示日曆。
// time: 時間選擇器。
// datetime-local: 本地日期和時間選擇器。
// month: 月份選擇器。
// week: 周數選擇器。

// 4. 選擇類型
// checkbox: 複選框，允許用戶選擇多個選項。
// radio: 單選框，允許用戶從一組選項中選擇一個。
// file: 文件上傳欄位，允許用戶選擇文件。

// 5. 其他類型
// color: 顏色選擇器，允許用戶選擇顏色。
// hidden: 隱藏的輸入欄位，不會顯示在表單中，但可以提交數據。
// button: 普通按鈕，可以用於觸發 JavaScript 事件。
// submit: 提交按鈕，提交表單。
// reset: 重置按鈕，重置表單中的所有欄位。

// 根據欄位名稱 傳回輸入標籤 type 屬性內容
export function field2InputType( keyName ){
    switch(keyName){
        case 'name':
            return 'text';
        case 'imgName':
            return 'text';
        case 'in_price':
            return 'number';
        case 'stock_qty':
            return 'number';
        case 'sale_price':
            return 'number';
        case 'updated':
            return 'checkbox'
        default :
            return `請到 myCollection.js 設定 ${keyName}` ;
    }
}

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
import topLogin from '@/assets/top01.png' ;
import centerLogin from '@/assets/center01.png';
import webLogoLogin from '@/assets/webLogo.png';
// 將影像匯出為物件
export const images = {
    imgUp,
    imgDown,
    topLogin,
    centerLogin,
    webLogoLogin,  
    car01,
    car02,
    car03,
    car04,
    car05,
    car06,
    car07,
    car08,
    car09,
    car10,
    car11,
    car12,
    car13,
    car14,
    car15,
    car16,
};

// 傳回影像資料
export function productImgNameToImgFile( imgName ){
    return images[`${imgName}`];
}


import store from '@/store' ;

// 設定非同步函數，判斷 VueX 是否有產品資料
export const getData = (delay) => {
    return new Promise((resolve) => {
        const checkData = () => {
            const products = store.getters.getProduction;
            const hasData = !!products;
            if (hasData) {
                resolve(products); // 當有資料時，解決 Promise
            } else {
                // 沒資料，就持續等下去
                setTimeout(() => {
                    console.log('myCoolection.getData.line.154');
                    checkData(); // 重新檢查資料
                }, delay+1000);
            }
        };
        checkData(); // 開始檢查資料
    });
};

// 設定訂單主檔物件格式，假設同一個瀏覽器只有一個人使用，所以訂單資訊就儲存在這裡
// 如果要建立副本，可以使用 {...orderMainObject}，這樣就是二個訂單
export const orderMainObject = {
            // 購物車編號、訂單編號
            orderNo:'',
            // 訂單明細
            orderDetail:[],
            // 商品總金額
            orderAmount: 0,
            // 其他費用
            orderOtherFee1:0,
            // 購物總金額
            orderAllAmount:0,
}
// 訂單明細檔物件格式 ( ProductsList4.vue 有使用 )
export class orderDetailObject{
    constructor(orderItemName,orderItemNum,orderPrice,orderNItemPrice,orderImage) {
        // 產品名稱
        this.orderItemName = orderItemName ;
        // 產品影像
        this.orderImage = orderImage ;
        // 產品數量
        this.orderItemNum = orderItemNum ;
        // 產品單價
        this.orderPrice = orderPrice ;
        // 產品小計
        this.orderNItemPrice = orderNItemPrice ;
    }
}

// 根據欄位名稱 傳回對應中文名稱
export function field2OrderDetailFieldName( keyName ){
    switch(keyName){
        case 'orderItemName':
            return '商品名稱';
        case 'orderImage':
            return '產品影像'
        case 'orderItemNum':
            return '訂購數量';
        case 'orderPrice':
            return '單　　價';
        case 'orderNItemPrice':
            return '小　　計';
        case 'delete':
            return '刪除'
        // 訂單主檔名稱轉換
        case 'orderAmount' :
            return '合　　計' ;        
        case 'orderNo':
            return '訂單編號';
        case 'orderOtherFee1':
            return '其他費用' ;
        case 'orderAllAmount':
            return '總金額';


        default :
            return `請到 myCollection.js 設定 ${keyName}` ;
    }
}

// 根據欄位名稱 傳回對應寬度
export function field2OrderDetailWidth( keyName ){
    switch(keyName){
        case 'orderItemName':
            return '30%';
        case 'orderImage':
            return '10%'
        case 'orderItemNum':
            return '10%';
        case 'orderPrice':
            return '15%';
        case 'orderNItemPrice':
            return '25%';
        case 'delete':
            return '10%'
        default :
            return `請到 myCollection.js 設定 ${keyName}` ;
    }
}