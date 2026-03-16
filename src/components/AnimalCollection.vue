<template>
    
    <div class="mt-3 border border-danger" title="模板名稱 AnimalCollection.vue" @mousemove="divMouseMove($event)">
        <div class="sticky sticky-top bg-primary text-dark">
            <div>顯示區域螢幕滑鼠座標點ScreenXY {{ mouseScreenX }} , {{ mouseScreenY }}</div>
            <div>網頁顯示區域的元素定位點 {{ mouseElementX }} , {{ mouseElementY }}</div>
            <div>滑鼠位移變化量 MoveMentXY {{ mouseMoveMentX }} , {{ mouseMoveMentY }}</div>
            <div>元素內滑鼠座標 OffsetXY {{ mouseOffsetX }} , {{ mouseOffsetY }}</div>
            <div>網頁區域座標 PageXY {{ mousePageX }} , {{ mousePageY }}</div>
        </div>
        <!-- 下面子組件，在 main.js 中註冊，所以在下面的 script 中沒有看到引入語法 -->
        <car-items/>
    </div>
</template>
<script>
export default {
    data(){
        return {
            // 滑鼠事件元素的定位點
            mouseElementX:null,
            mouseElementY:null,
            
            // 滑鼠在螢幕上的座標點
            mouseScreenX:null,
            mouseScreenY:null,

            mouseMoveMentX:null,
            mouseMoveMentY:null,

            // 滑鼠所指到的元素，相對元素定位點的偏移量
            mouseOffsetX:null,
            mouseOffsetY:null,

            mousePageX:null,
            mousePageY:null,

        };
    },
    methods:{
        divMouseMove( event ){
            // 滑鼠物件屬性，都是唯讀的，畢竟都是從物件中傳回的內容
            this.mouseElementX=event.target.x;
            this.mouseElementY=event.target.y;
            this.mouseScreenX = event.screenX;
            this.mouseScreenY = event.screenY;
            this.mouseMoveMentX = event.movementX;
            this.mouseMoveMentY = event.movementY;
            this.mouseOffsetX = event.offsetX;
            this.mouseOffsetY = event.offsetY;            
            this.mousePageX = event.pageX;
            this.mousePageY = event.pageY;            
            // console.log( event );
        }
        
    },
}
</script>

<style scoped>
    .sticky{
        position: sticky;
    }
    .sticky-top{
        top:0px;
    }


</style>