//在 JavaScript 中，無法直接使用 CSS 的 @media 規則來設置樣式，但你可以使用 JavaScript 來檢查視窗的大小，並根據條件來改變樣式或執行某些操作。這可以通過 window.matchMedia 方法來實現。
// 以下是一個示範，說明如何使用 JavaScript 來檢查當前視窗是否符合 @media screen and (max-width: 1200px) 的條件：
// 定義媒體查詢
const mediaQuery = window.matchMedia('(max-width: 1200px)');

// 函數來處理媒體查詢的變化
function handleMediaChange(e) {
  if (e.matches) {
    // 當視窗寬度小於或等於 1200px 時執行的代碼
    console.log('視窗寬度小於或等於 1200px');
    // 例如，改變某個元素的樣式
    document.body.style.backgroundColor = 'lightblue';
  } else {
    // 當視窗寬度大於 1200px 時執行的代碼
    console.log('視窗寬度大於 1200px');
    document.body.style.backgroundColor = 'white';
  }
}

// 初始化時檢查一次
handleMediaChange(mediaQuery);

// 監聽媒體查詢的變化
mediaQuery.addEventListener('change', handleMediaChange);
