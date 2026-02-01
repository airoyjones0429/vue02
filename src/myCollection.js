// 這裡設定使用的集合及文件名稱
// 集合名稱必須事先知道，Firebase 沒提供 API 自動化讀取所有集合名稱
// 在這裡設定這個 App 使用 Firebase 的集合名稱
export const myFirebaseCollection = 'websell';

// 所有文件名稱，都會在這裡設定
export const myCollectionDoc = { 
    // ./components/manage_firestore/ 中，使用的文件名稱
    product: 'production' ,
    // ./components/manage_firestore1/ 中，使用的文件名稱
    product1 : 'products'
} ;

//產品的規格，統一在這裡設定，如果要增加欄位，就在這裡增加，除非新建立的資料，不然移除舊欄位，
export const myProductContentFields = { 
        name: null , //產品名稱
        imgName: null , //產品影像名稱
        in_price: null , //產品進貨價格
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
        case 'updated':
            return 'text'
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
// 將影像匯出為物件
export const images = {
    imgUp,
    imgDown,
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