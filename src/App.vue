<template>
  <!-- <main-screen/> -->
   <!-- <doc-list/>  -->
 <p>===============</p>  
   <doc-list1/>
</template>


<!-- 用 JS 的 mediaQuery 對設備狀態做監視 -->
<script src="./mediaQuery.js"></script>

<style>
  /* 1. 定義變數，你可以在 :root 選擇器中定義全局變數，這樣可以在整個文件中使用它們。 */
  :root {
    --primary-color: #3498db;
    --secondary-color: #2ecc71;
    --font-size: 16px;
  }

  /* 2. 使用變數，在需要的地方使用這些變數，這樣可以保持一致性並方便修改。 */
  body {
    font-size: var(--font-size);
    color: var(--primary-color);
  }

  .button {
    background-color: var(--secondary-color);
    color: white;
  }

  /* 3. 利用變數進行計算，CSS 變數可以與 calc() 函數一起使用，使得設計更加靈活。 */
  /* .container {
    padding: calc(var(--font-size) * 2);
  } */

  /* 4. 媒體查詢中的變數，你可以在媒體查詢中使用變數，這樣可以根據不同的螢幕尺寸調整樣式。 */
  /* @media (max-width: 600px) {
    :root {
      --font-size: 14px;
    }
  } */

  /* 5. 避免重複定義，將常用的顏色、字體和間距等定義為變數，這樣可以避免在多個地方重複定義相同的值。 */

  /* 6. 結合 JavaScript，如果需要動態改變樣式，可以使用 JavaScript 來修改 CSS 變數的值。 */
  /* document.documentElement.style.setProperty('--primary-color', '#e74c3c'); */

</style>