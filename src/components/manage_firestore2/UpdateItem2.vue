<template>
    <!-- RecordName 是 Firebase 文件中的一個欄位名稱 -->
    <!-- RecordContent 是 RecordName 的內 -->
    <div class="container mt-3">
        <!-- !!注意  當要產生重複的物件格式時，以下面格式，可以讀出 (物件屬性內容、物件屬性名稱、物件記錄索引) -->
        <div v-for="( RecordContent , RecordName , index ) in updateDataPackage" :key="RecordName" :title="RecordName">
          <div v-if="showPageButton( index + 1 )" class="card" >
              <div class="card-header text-light bg-primary h2">產品名稱：{{RecordName}}</div>
              <!-- 當 :key 內容改變時，Vue 會重新渲染內部元素，JS動態增加的CSS類別不會被保留 -->
              <!-- 下面的 updated 就是用來控制是否為更新狀態 -->
              <div class="card-body d-flex" :key="updateDataPackage[RecordName]['updated']" >
                  <div v-for="(Field , FieldName) in RecordContent" :key="FieldName" >
                      <div v-if="checkFieldName(FieldName)">
                          <label :for="FieldName"  >{{ index2ChineseName(FieldName) }}</label>
                          <input :type="field2InputType(FieldName)" class="form-control" 
                          :placeholder="'請輸入'+index2ChineseName(FieldName)" 
                          :name="FieldName"  :value="Field"
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
        'showPageButton', //使用外部功能
        'inputMode' // 模板動作模式 輸入
    ],
    watch:{
        updateDataPackage(newVal){
            this.tempData = { ...newVal };
            console.log( 'UpdateItem2.line.55',this.tempData );
        },
    },
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
            console.log('UpdateItem.95.focusInput',this.$refs[refName][0] , this.mounted );

            // 因為 :key 被改變，Vue 會刷新物件，導致焦點被重設，會變為失焦狀態
            // 設定執行一次的計時器，並增加檢查條件，避免重複執行一次
            if ( !this.inputFocusCheckState ){
                this.inputFocusCheckState=true; //檢查中
                setTimeout(() => {
                    this.$refs[refName][0].focus();
                    console.log('UpdateItem.95.setTimeout.300ms' );
                    this.inputFocusCheckState=false; //初始化狀態
                }, 100);
            }
            
            
            // this.$refs[this.focusRefName].focus(); // 設定焦點
        }        
    },
}
</script>