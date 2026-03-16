<template>
                
                <h3>H6</h3>
                <p> 表單常見的元件 </p>
                <form action="">

                    <!-- 核取方塊 checkbox-->
                    <div class="form-check">
                        <input type="checkbox" class="form-check-input" id="check1" name="option1" value="something" checked>
                        <label class="form-check-label" for="check1">Option 1</label>
                    </div>
                    <div class="form-check">
                        <input type="checkbox" class="form-check-input" id="check2" name="option2" value="something">
                        <label class="form-check-label" for="check2">Option 2</label>
                    </div>
                    <div class="form-check">
                        <input type="checkbox" class="form-check-input" disabled>
                        <label class="form-check-label">Option 3</label>
                    </div>

                    <!-- 單選方塊 radio：相同的 name 當成一組 -->
                    <div class="form-check">
                    <input type="radio" class="form-check-input" id="radio1" name="optradio" value="option1" checked>
                    <label class="form-check-label" for="radio1">Option 1</label>
                    </div>
                    <div class="form-check">
                    <input type="radio" class="form-check-input" id="radio2" name="optradio" value="option2">
                    <label class="form-check-label" for="radio2">Option 2</label>
                    </div>

                    <!-- 下面是另一組 radio -->
                    <div class="form-check">
                    <input type="radio" class="form-check-input" id="radio11" name="optradio2" value="option1" checked>
                    <label class="form-check-label" for="radio11">Option 1</label>
                    </div>
                    <div class="form-check">
                    <input type="radio" class="form-check-input" id="radio12" name="optradio2" value="option2">
                    <label class="form-check-label" for="radio12">Option 2</label>
                    </div>

                    <!-- 下面是無法選擇的 radio -->
                    <div class="form-check">
                    <input type="radio" class="form-check-input" disabled>
                    <label class="form-check-label">Option 3</label>
                    </div>

                    <!-- 下面是切換樣式 的 checkbox-->
                    <div class="form-check form-switch">
                        <input class="form-check-input" type="checkbox" id="mySwitch" name="darkmode" value="yes" checked>
                        <label class="form-check-label" for="mySwitch">Dark Mode</label>
                    </div>

                    <!-- 範圍輸入工具 range -->
                    <label for="customRange" class="form-label">Custom range</label>
                    <input type="range" class="form-range" id="customRange" name="points" step="10" min="0" max="1000">


                </form>



</template>