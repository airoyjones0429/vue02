// store.js
// 使用 vuex 管理狀態，要使用下面指令安裝 vuex
// npm  install  vuex@next
import { createStore } from 'vuex';



// 引用使用者狀態管理模組
import userVueX from './userModule';

// 引用產品狀態管理模組
import productVueX from './productModule';

import orderVuex from './orderModule';


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



// 創建 Vuex Store 狀態管理 並使用模組
const store = createStore({
    modules:{
        user: userVueX ,
        product: productModule, // 這個項目只是練習範例，最後要移除
        production: productVueX,
        order:orderVuex,
    }
});

export default store;