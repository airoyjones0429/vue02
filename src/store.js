// store.js
// 使用 vuex 管理狀態，要使用下面指令安裝 vuex
// npm  install  vuex@next
import { createStore } from 'vuex';
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
        arrayUnion, 
        // arrayRemove ,
        // increment ,
        runTransaction ,
        // deleteField ,
        // getDoc ,
        // getDocFromCache 

    } 
    from "firebase/firestore";


// 引用使用者狀態管理模組
import userModule from './userModule';



// 產品模組，產品儲存在 websell 集合中的 production 文件中
const productModule = {
  state: {
    products: {},
    products_local: {},
  },
  mutations: {
    setProducts(state, payload) {
      state.products = payload;
    },
  },
  actions: {
    // 抓取產品資料的動作
    fetchProducts({ commit }) {
      // 假設從 API 獲取產品資料
      const productsData = [{ id: 1, name: 'Product A' }, { id: 2, name: 'Product B' }];
      commit('setProducts', productsData);
    },
  },
  getters: {
    //取得產品數量
    productCount(state) {
      return state.products.length;
    },
    //取得產品項目
    productItems(state){
        return state.products ;
    },
  },
};

// 與既有文件，建立firebase連結  的產品狀態管理模組
const productionModule = {
  state() {
    // 將取回的資料儲存在本地端陣列中
    return {
        products: null,
    } 
  },
  mutations: {
        // 所有的像 setState() 方法，都在這裡設定
        // 所有的狀態改變，都靠這裡的方法來處理
        async FetchFirebaseProduction(state, { collection_name , document_name } ){
            let fetchData ;
            //在資料庫中找到文件的位置       主集合            子集合
            const LoadDocRef = doc(db, collection_name,   document_name );
            try {
                await runTransaction(db, 
                    async (transaction) => 
                    {
                        //取得文件
                        fetchData = await transaction.get(LoadDocRef);
                        if (!fetchData.exists()) {
                            throw "Document does not exist!";
                        }
                        console.log( 'store.85' ,fetchData.data() ) ;
                        // 取回代表所產品項目的文件內容
                        state.products = fetchData.data() ;
                        // 檢索文件中，有幾種欄位名稱，每一個欄位，都代表一項產品種類
                        Object.keys( state.products ).forEach( productFieldName =>{
                            console.log( '1' , productFieldName ) ; //列出產品種類名稱
                            console.log( '2' , state.products[productFieldName]) //指定特定產品陣列
                            console.log( '3.length' , state.products[productFieldName].length) //取得特定產品陣列長度
                            
                            // 陣列就可以直接使用  .forEach() 方法
                            // 物件不能使用 .forEach() 方法，Array.isArray() 用來判斷是不是陣列
                            // 列出特定產品種類，每個產品的內容
                            if  (state.products[productFieldName] !== null && typeof(state.products[productFieldName]) === 'object') {
                                // 陣列及物件會進入到這裡
                                if ( Array.isArray(state.products[productFieldName])){
                                    // 陣列會進到這裡
                                    state.products[productFieldName].forEach( (item) => {
                                        console.log( 'store.line.102','name',item.name , 
                                            'imgName',item.image_name , 
                                            'stockQty ',item.stock_qty , 
                                            'unitPrice',item.unit_price 
                                            );
                                    });
                                } else {
                                    // 物件應該盡到這裡
                                    let index = 0 ;
                                    Object.keys( state.products[productFieldName] ).forEach(
                                        field => {                                            
                                            console.log( 'store.line.113', ++index , field );
                                        }
                                    );
                                }
                            } else {
                                console.log( 'store.line.109',state.products[productFieldName] ) ;
                            }
                        });


                        
                        //取得 population 內容
                        // const newPopulation = laDoc.data().population + 1;
                        // console.log(  isNaN( newPopulation ) ? 'newPopulation == NaN' : newPopulation  ) ;
                        // if (isNaN( newPopulation )) {
                        //     transaction.update(LoadDocRef, { population: 1 });    
                        // }else {
                        //     transaction.update(LoadDocRef, { population: newPopulation });
                        // }
                        
                    }
                );
                
                console.log("產品資料讀取成功");
            } catch( e ) {
                console.error("產品資料讀取失敗", e);
            }        
        },
        // 新建立 指定產品文件  指定欄位  指定內容
        async addNewItemInFieldOnDoc(state,{ collection_name , document_name , field_name , data_content }){
            // 取得文件位置
            const docRef = doc( db , collection_name , document_name ) ;
            
            try{
                await runTransaction(db, 
                    async (transaction) => {
                        // 取得文件
                        const fetchData = await transaction.get(docRef);
                        // 文件不存在，觸發錯誤訊息
                        if( !fetchData.exists()) { throw "Document does not exist!";}
                        // 取得文件所有內容
                        const docData = fetchData.data();
                        // 取得文件欄位清單
                        Object.keys( docData ).forEach( 
                            field => { 
                                console.log('1',field); //取得欄位名稱
                                console.log('2',docData[field]); //取得欄位內容
                            });
                        // JS 中物件屬性名稱，可以用變數代替，只要在變數外加上 [] 中括號就可以了
                        // 加入文件欄位內容
                        await updateDoc(docRef, 
                            {
                                // arrayUnion() 並不會增加，重複的項目，陣列或物件，要用這種方式更新
                                [field_name] : arrayUnion( data_content ),
                            }
                        );

                    });
                    console.log("store.js line.142" , state.products , field_name , data_content );
            } catch( error ){
                console.error("新增欄位資料失敗", error);
            }
            

        },
        // 新建立或更新 指定產品文件  指定欄位  的內容
        async addNewAndUpdateValueInFieldOnDoc(state,{ collection_name , document_name , field_name , data_content }){
            // 取得文件位置
            const docRef = doc( db , collection_name , document_name ) ;
            
            try{
                await runTransaction(db, 
                    async (transaction) => {
                        // 取得文件
                        const fetchData = await transaction.get(docRef);
                        // 文件不存在，觸發錯誤訊息
                        if( !fetchData.exists()) { throw "Document does not exist!";}
                        // 取得文件所有內容
                        const docData = fetchData.data();
                        if ( docData[field_name] ){
                            console.log('欄位存在' , docData[field_name] );
                        }
                        
                        // 刪除物件 updated 屬性
                        delete data_content.updated ;
                        // JS 中物件屬性名稱，可以用變數代替，只要在變數外加上 [] 中括號就可以了
                        // 使用 parseInt()，可以取得數值資料
                        // 沒使用，必定取得字串資料
                        await updateDoc(docRef, 
                            {
                                // [field_name] : parseInt(data_content),
                                [field_name] : data_content,
                            }
                        );

                        // 增加物件 updated 屬性
                        data_content.updated = false ;


                    });
                    console.log("store.line.191" , state.products , field_name , data_content );
            } catch( error ){
                console.error("store.line.193", error);
            }
        },
        // 新建立或更新 指定產品文件  多個欄位  的內容
        async createAndUpdateValueOnDoc(state,{ collection_name , document_name , dataPackage }){
            // 取得文件位置
            const docRef = doc( db , collection_name , document_name ) ;
            
            try{
                await runTransaction(db, 
                    async (transaction) => {
                        // 取得文件
                        const fetchData = await transaction.get(docRef);
                        // 文件不存在，觸發錯誤訊息
                        if( !fetchData.exists()) { throw "Document does not exist!";}
                        // updateDoc() 是 firebase 提供的 API ，使用前必須在上方引用模組
                        // dataPackage 必須是 JS 物件資料型態
                        // 執行文件的更新動作
                        await updateDoc(docRef, dataPackage );
                    });
                    // 更新本地端產品狀態
                    state.products_local = { ...state.products_local , ...dataPackage } ;
                    console.log("store.line.234" ,   state.products_local  );
            } catch( error ){
                console.error("store.line.193", error);
            }
        },
    },
    actions:{
        // 抓取指定文件所有資料
        fetchProductsFromFirebase({commit} , { collection_name , document_name } ){
            commit('FetchFirebaseProduction' , { collection_name , document_name });
        },
        // 加入 指定文件 指定欄位 新項目資料
        setNewItemInFieldOnDoc({commit} ,{ collection_name , document_name , field_name , data_content } ){
            commit('addNewItemInFieldOnDoc' , { collection_name , document_name , field_name , data_content });
        },
        // 設定  指定文件 指定欄位  的內容
        setValueInFieldOnDoc({commit} ,{ collection_name , document_name , field_name , data_content } ){
            commit('addNewAndUpdateValueInFieldOnDoc' , { collection_name , document_name , field_name , data_content });
        },
        // 改變 Firebase 特定文件中多個欄位內容，包括新增欄位及新內容
        setManyValueToDoc({commit} , { collection_name , document_name , dataPackage } ){
            commit('createAndUpdateValueOnDoc' , { collection_name , document_name , dataPackage });
        },
    },
    getters:{
        getProduction(state) {
            return state.products; // 取得產品清單
        },
    },
}


// 創建 Vuex Store 並使用模組
const store = createStore({
    modules:{
        user: userModule ,
        product: productModule,
        production: productionModule,
    }
});

export default store;