<template>
<h3>H7</h3>
                <p>分頁內容 7</p>
                <p>Use the disabled and/or readonly attributes to disable the input field:</p>

                <form>
                    <!-- 沒有邊框的輸入方塊 -->
                    <input type="text" class="form-control-plaintext" placeholder="這是沒有邊框的輸入方塊">

                    <!-- 有邊框的輸入方塊，預設值 -->
                    <input type="text" class="form-control mt-3" placeholder="一般的輸入方塊">

                    <!-- 設定顏色輸入 -->
                    <label for="myColor" class="form-label">Color picker</label>
                    <input type="color" class="form-control form-control-color" id="myColor" value="#CCCCCC" title="Choose a color">

                    <!-- 單選 選擇項目輸入 -->
                    <label for="sel1" class="form-label">單選 選擇項目輸入:</label>
                    <select class="form-select" id="sel1" name="sellist1">
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                    </select>

                    <!-- 多選 選擇項目輸入  用 shift 連選、用 ctrl 挑選 -->
                    <label for="sel2" class="form-label">多選 選擇項目輸入  用 shift 連選、用 ctrl 挑選:</label>
                    <select multiple class="form-select" id="sel2" name="sellist2">
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                    </select>                    

                    <!-- 輸入式 選項瀏覽清單 如果允許使用者輸入 加快搜尋速度  使用這個元件-->
                    <label for="browser" class="form-label">輸入式 選項瀏覽清單:</label>
                    <input class="form-control" list="browsers" name="browser" id="browser">
                    <datalist id="browsers">
                    <option value="Edge"></option>
                    <option value="Firefox"></option>
                    <option value="Chrome"></option>
                    <option value="Opera"></option>
                    <option value="Safari"></option>
                    </datalist>    





                </form>


</template>

<script>

</script>