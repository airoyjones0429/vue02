<template>
    <!-- 搭配 DocList3.vue 使用 -->
    <!-- RecordName 是 Firebase 文件中的一個欄位名稱 -->
    <!-- RecordContent 是 RecordName 的內容 -->
    <div class="container mt-3">
        <!-- !!注意  當要產生重複的物件格式時，以下面格式，可以讀出 (物件屬性內容、物件屬性名稱、物件記錄索引) -->
        <div v-for="( RecordContent , RecordName , index ) in updateDataPackage" :key="RecordName" :title="RecordName">
          <div v-if="showPageButton( index + 1 )" class="card" ref="selectPageItemNo" >
              <div class="card-header text-light bg-primary h2">產品名稱：{{RecordName}}</div>
              <!-- 當 :key 內容改變時，Vue 會重新渲染內部元素，JS動態增加的CSS類別不會被保留 -->
              <!-- 下面的 updated 就是用來控制是否為更新狀態，並且消除修改資料增加的 CSS 樣式類別 -->
              <div class="card-body d-flex" :key="updateDataPackage[RecordName]['updated']" >
                  <div v-for="(Field , FieldName) in RecordContent" :key="FieldName" >
                      <div v-if="checkFieldName(FieldName)">
                          <label :for="FieldName"  >{{ index2ChineseName(FieldName) }}</label>
                          <input :type="field2InputType(FieldName)" class="form-control" 
                          :placeholder="'請輸入'+index2ChineseName(FieldName)" 
                          :name="FieldName"  :value="Field"
                          :autocomplete="FieldName"
                          :ref="`${FieldName}${index}`"
                          @focusin="focusRefName=`${FieldName}${index}`;this.$emit('updateModeEvent',RecordName)"
                          @input="updateInputBox( RecordName ,FieldName , $event.target.value , $event )">
                      </div>
                  </div>
              </div>
              <div class="card-footer bg-secondary">
                  <button @click="console.log(RecordContent)">列出目前記錄內容</button>
                  <button @click="writeData(RecordName , $event )">writeData</button>

                  <!-- 更新模式 updateMode，才有移除功能 -->
                  <button v-if="inputMode=='updateMode'" @click="reMoveData(RecordName , $event )">RemoveItem</button>
              </div>
          </div>

          </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            focusRefName: null ,
            tempData: null ,
            curPage: null ,
            ppRecord: null ,
            recordQty: 0 ,
            mounted:false ,
            inputFocusCheckState:false , // false :並不是在檢查焦點狀態中，true :檢查中，不用再檢查
        };
    },
    mounted(){
        this.mounted=true ;        
    },
    props:[
        'updateDataPackage', // 外部資料 輸入
        'checkFieldName',  // 使用外部功能
        'field2InputType', // 使用外部功能
        'index2ChineseName',// 使用外部功能
        'showPageButton', //使用外部功能，決定這個產品項目是否要顯示
        'inputMode', // 模板動作模式 輸入
        'selectItemIndex', // 分頁第N項目選擇，數值代表
        'selectItemPage' // 第 X 分頁
    ],
    watch:{
        // 當 updateDataPackage 改變時，更新內部的 tempData 資料
        // props 為外部 → → 內部，不能在此組件改變其內容，必須在源頭才能改變
        updateDataPackage(newVal){
            this.tempData = { ...newVal };
            console.log( 'UpdateItem2.line.55',this.tempData );
        },
        pageItemPoint:{
            handler(newVal,oldVal){
                console.log('UpdateItem3.line.70', newVal, oldVal);
                if(newVal.selectItemIndex != -1 ){
                    this.selMarkItem(newVal.selectItemIndex,oldVal.selectItemIndex);
                }
            },
            deep:true ,
        },
        // selectItemIndex(newVal, oldVal) {
        //     this.selMarkItem(newVal,oldVal);
        //     // console.log('UpdateItem3.line.68', newVal, oldVal);

        //     // // 通常，只在需要確保 DOM 更新完成後再執行的操作中使用 this.$nextTick(()=>{})
        //     // // ，而對於不依賴於 DOM 狀態的邏輯，則不需要使用 $nextTick()
        //     // // 使用 nextTick 確保 DOM 更新後再執行
        //     // this.$nextTick(() => {
        //     //     // 確保 $refs.selectPageItemNo 存在並且有足夠的元素
        //     //     if (this.$refs.selectPageItemNo && this.$refs.selectPageItemNo.length >= newVal) {
        //     //         // 移除之前的 CSS 類別（如果需要）
        //     //         if (oldVal && this.$refs.selectPageItemNo[oldVal - 1]) {
        //     //             this.$refs.selectPageItemNo[oldVal - 1].classList.remove('find');
        //     //         }
                    
        //     //         // 增加新的 CSS 類別
        //     //         this.$refs.selectPageItemNo[newVal - 1].classList.add('find');
        //     //         // 滾動到指定的元素
        //     //         this.$refs.selectPageItemNo[newVal - 1].scrollIntoView({ behavior: 'smooth', block: 'start' });                    
        //     //     } else {
        //     //         console.warn('Element not found in $refs.selectPageItemNo for index:', newVal - 1);
        //     //     }
        //     // });
        // }
    },
    computed:{
        pageItemPoint() {
            return {
                selectItemPage: this.selectItemPage,
                selectItemIndex: this.selectItemIndex,
            };
        },
    },
    // emits 並非必須，但是可以明顯表示出，此子組件有哪些可觸發外部方法的事件名稱，用於集中管理
    emits:[
        'writeData',
        'updateInputBox',
        'reMoveData',
        'updateModeEvent',
    ],
    methods:{
        writeData(RecordName ,event ){
            console.log('UpdateItem2.line.60');
            this.$emit('writeData',RecordName , event)
        },
        updateInputBox(RecordName ,FieldName , value , event){
            console.log('UpdateItem2.line.64');
            this.$emit('updateInputBox',{RecordName ,FieldName , value , event});
        },

        // event['target'].parentNode 這樣也可以抓到發生事件目標元素的父節點
        reMoveData( RecordName , event ){

            // 顯示確認視窗
            const confirmation = confirm("您確定要刪除這筆資料嗎？");
            console.log( confirmation );
            // 根據使用者的選擇執行相應的操作
            if (confirmation) {
                console.log('UpdateItem2.line.72.reMoveData ');
                this.$emit('reMoveData',RecordName , event.target ) ;
            } else {
                console.log('UpdateItem2.line.83.沒刪除資料 ');
                // 使用者選擇 "取消"，不執行任何操作
                // alert("資料未刪除！");
            }
        },
        // 為了 UX 改善所產生的方法，這只是方法之一，也可以用操作順序改善
        focusInput() {
            console.log('UpdateItem.95.focusInput.目前獲得焦點的輸入方塊 ref 名稱',this.focusRefName);
            const refName = this.focusRefName ;
            // 如果要 "動態" 的使用 ref 名稱，會在組件中儲存目前焦點的 ref 名稱
            // 然後使用 this.$refs[refName][0] 來指定  所選到的  ref 元素
            // 注意!!  this.$refs 這個物件的後面使用 . 來直接指定 ref 的名稱
            // 因為無法得知 "使用者" 想要怎麼點選，所以無法用 . 來指定 ref 元素
            // 注意!!  $refs 是物件，使用 ['refName'] 可以找到 ref = "refName" 的陣列!! 注意!! 是陣列 不是元素
            // 所以要取得第一個元素，就只要在後面加上 [0] 就可以取得 使用者輸入焦點的元素
            console.log('UpdateItem.95.focusInput',this.$refs[refName][0] , this.mounted ); // this.mounted 在此沒有用

            // 因為 :key 被改變，Vue 會刷新物件，導致焦點被重設，會變為失焦狀態
            // 設定執行一次的計時器，並增加檢查條件，避免重複執行一次
            if ( !this.inputFocusCheckState ){
                this.inputFocusCheckState=true; //設定為檢查中，避免無窮定時觸發
                setTimeout(() => {
                    this.$refs[refName][0].focus(); //這裡的程序流程會再度觸發 focusInput() 方法
                    console.log('UpdateItem.95.setTimeout.300ms' );
                    this.inputFocusCheckState=false; //初始化狀態
                }, 100);
            }
            
            
            // this.$refs[this.focusRefName].focus(); // 設定焦點
        },
        selMarkItem(newVal, oldVal){
            console.log('UpdateItem3.line.68', newVal, oldVal);

            // 通常，只在需要確保 DOM 更新完成後再執行的操作中使用 this.$nextTick(()=>{})
            // ，而對於不依賴於 DOM 狀態的邏輯，則不需要使用 $nextTick()
            // 使用 nextTick 確保 DOM 更新後再執行
            this.$nextTick(() => {
                // 確保 $refs.selectPageItemNo 存在並且有足夠的元素
                if (this.$refs.selectPageItemNo && this.$refs.selectPageItemNo.length >= newVal) {
                    // 移除之前的 CSS 類別（如果需要）
                    if (oldVal && this.$refs.selectPageItemNo[oldVal - 1]) {
                        this.$refs.selectPageItemNo[oldVal - 1].classList.remove('find');
                    }
                    
                    // 增加新的 CSS 類別
                    this.$refs.selectPageItemNo[newVal - 1].classList.add('find');
                    // 滾動到指定的元素
                    this.$refs.selectPageItemNo[newVal - 1].scrollIntoView({ behavior: 'smooth', block: 'start' });                    
                } else {
                    console.warn('Element not found in $refs.selectPageItemNo for index:', newVal - 1);
                }
            });            

        }
    },
}
</script>

<style scoped>
/* 這是動態增加的類別樣式，所以沒看到任何硬編碼 */
.update{
    background-color: coral;
}
.find {
    background-color: yellowgreen;
}
</style>