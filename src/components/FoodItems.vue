<template>
<div class="container-fluid" style="background-color: rgb(112, 112, 112);">

        <!-- 沒有順序的項目標籤 -->
        <ul>
            <li>1</li>
            <li>2</li>
            <li>3</li>
        </ul>

        <!-- 自動標順序的項目標籤 -->
        <ol>
            <li>1</li>
            <li>2</li>
            <li>3</li>
        </ol>

        <!-- 這裡的分頁的按鈕大小，會隨著文字長度而變長，nav-justified  -->
        <ul class="nav nav-tabs text-bg-info">
            <li class="nav-item">
                <a class="nav-link active" data-bs-toggle="tab" href="#h1">1</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" data-bs-toggle="tab" href="#h2">123</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" data-bs-toggle="tab" href="#h3">顯示容器垂直卷軸</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" data-bs-toggle="tab" href="#h4">標題-輸入-按鈕 範例</a>
            </li>
        </ul>

        <!-- 這裡的分頁的按鈕寬度會相等 -->
        <ul class="nav nav-tabs text-bg-info nav-justified">
            <li class="nav-item">
                <a class="nav-link active" data-bs-toggle="tab" href="#h5">標題-輸入 範例</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" data-bs-toggle="tab" href="#h6">常用物件1</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" data-bs-toggle="tab" href="#h7">常用物件2</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" data-bs-toggle="tab" href="#h8">表單範例1</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" data-bs-toggle="tab" href="#h9">表單範例2</a>
            </li>
            
        </ul>

        <!-- 分頁面板內容 -->
        <div class="tab-content">
            <div id="h1" class="container tab-pane active"><br>
            <h3>H1</h3>
            <p>分頁內容 1</p>
            </div>
            <div id="h2" class="container tab-pane fade"><br>
            <h3>H2</h3>
            <p>分頁內容 2</p>
            </div>
            <div id="h3" class="container tab-pane fade" style="height: 500px;"><br>
                <h3>H3</h3>
                <!-- overflow-y 要設定 auto 垂直卷軸才會自動出現 -->
                <div style="height: 100px;background-color: blue;overflow-y: auto;">
                    <div style="height: 1000px;">
                        這個內部容器高度為 1000px，overflow-y 要設定 auto 垂直卷軸才會自動出現，<br>
                        如果設定為 visible 不會出現垂直卷軸，只會將內容全部展開在畫面上歐!!
                    </div>
                </div>
            </div>
            <div id="h4" class="container tab-pane fade"><br>
                <h3>標題-輸入-按鈕123</h3>
                <form action="" class="input-group">
                    <span class="input-group-text">標題名稱</span>
                    <input type="text" class="form-control">
                    <button class="btn btn-outline-light bg-success" type="button">送出</button>
                    <button class="btn btn-outline-light bg-danger" type="button">送出</button>
                    <button class="btn btn-outline-light bg-primary" type="button">送出</button>
                </form>
            </div>
            <div id="h5" class="container tab-pane fade"><br>
                <h3>H5</h3>
                <form action="">
                    <p>input-group-sm</p>
                    <div class="input-group input-group-sm mb-3">
                        <span class="input-group-text">小標題名稱</span>
                        <input type="text" class="form-control">
                        <span class="input-group-text">小標題名稱</span>
                    </div>
                    <p>input-group</p>
                    <div class="input-group input-group mb-3">
                        <span class="input-group-text">標題名稱</span>
                        <input type="text" class="form-control">
                    </div>                    
                    <p>input-group-lg</p>
                    <div class="input-group input-group-lg mb-3">
                        <span class="input-group-text">大標題名稱</span>
                        <input type="text" class="form-control">
                    </div>   

                    <!-- 多資料欄位輸入 -->
                    <p>input-group > input-group-text 就可以產生群組效果</p>
                    <p>input-group > form-control     就可以產生群組效果</p>
                    <div class="input-group mb-3">
                        <span class="input-group-text">姓名資料</span>
                        <input type="text" class="form-control" placeholder="請輸入姓">
                        <input type="text" class="form-control" placeholder="請輸入名">
                    </div>

                    <div class="input-group mb-3">
                        <span class="input-group-text text-bg-dark">@</span>
                        <span class="input-group-text">姓</span>
                        <input type="text" class="form-control" placeholder="請輸入姓">
                        <span class="input-group-text">名</span>
                        <input type="text" class="form-control" placeholder="請輸入名">
                        <span class="input-group-text text-bg-danger">@</span>
                    </div>

                </form>
            </div>
            <div id="h6" class="container tab-pane fade"><br>
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
                    <input type="radio" class="form-check-input" id="radio1" name="optradio2" value="option1" checked>
                    <label class="form-check-label" for="radio1">Option 1</label>
                    </div>
                    <div class="form-check">
                    <input type="radio" class="form-check-input" id="radio2" name="optradio2" value="option2">
                    <label class="form-check-label" for="radio2">Option 2</label>
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


            </div>
            <div id="h7" class="container tab-pane fade text-bg-info"><br>
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
            </div>
            <div id="h8" class="container tab-pane fade"><br>
                <h3>H8</h3>
                <p>表單：列樣式</p>
                <form>
                    <div class="row">
                        <div class="col-6">
                            <input type="text" class="form-control" placeholder="輸入電子信箱" name="email">
                        </div>
                        <div class="col-6">
                            <input type="password" class="form-control" placeholder="輸入密碼" name="pswd">
                        </div>
                        <button type="reset" class="btn btn-danger mt-3">清除</button>
                        <button type="submit" class="btn btn-primary mt-3">送出</button>
                    </div>
                </form>                
            </div>
            <div id="h9" class="container tab-pane fade" style="width: 500px;"><br>
                <h2>表單：堆疊樣式</h2>
                <div class="container mt-3">
                    <form action="">
                        <div class="mb-3 mt-3">
                            <label for="email">電子信箱:</label>
                            <input type="email" class="form-control" id="email" placeholder="Enter email" name="email">
                        </div>
                        <div class="mb-3">
                            <label for="pwd">密碼:</label>
                            <input type="password" class="form-control" id="pwd" placeholder="Enter password" name="pswd">
                        </div>
                        <div class="form-check mb-3">
                            <label class="form-check-label">
                                <input class="form-check-input" type="checkbox" name="remember">記住我
                            </label>
                        </div>
                        <div class="mb-3 mt-3">
                        <label for="comment">備註:</label>
                        <textarea class="form-control" rows="5" id="comment" name="text" placeholder="請輸入備註內容"></textarea>
                        </div>
                        <button type="submit" class="btn btn-primary">送出</button>
                    </form>
                </div>            
            </div>                                    

        </div>


    </div>

</template>