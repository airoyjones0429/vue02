<template>
    <!-- 這是一個含有自有組件的組件 -->
    <div class="text-dark" :id="`${id}${String(id).length}${id}`">
        
        <div ref="ulTitle" :class="{
            'cursor-point' : treeNumber != -1 ,
            'ul-title':bgControl%2==0,
            'ul-title1':bgControl%2==1,
            'bg-blue':titleBGControl%3==0,
            'bg-yellow': titleBGControl%3==1,
            'bg-light-blue': titleBGControl%3==2,
             }"
             :title="treeNumber"
             @click="collapseToggle" data-bs-toggle="collapse"
        >
             {{ listTitle }}
        </div>
        
        <div class="collapse" :ref="id" >
            <!-- 是陣列，在這裡顯示 -->
            <!-- <ul v-if="Array.isArray(listItem)==true"> -->
            <ul v-if="Array.isArray( listItem )">
                <li v-for="item in listItem" :key="item">
                    <!-- 內容有用：分開  注意!!注意!!  必須要加入遞迴結束條件 treeNumber 的數值就是為了停止遞迴繼續渲染自己的 UI  -->
                    <ul-list  :titleBGControl="titleBGControl+1" :id="`${id}${id}`"
                     :list-title="item.split('：')[0]" :treeNumber="item.split('：').length - 2"
                     :list-item="treeNumber > 0 ? [item.replace( `${item.split('：')[0]}：` , '' )] : ''"
                    />
                </li>            
            </ul>
        </div>
    </div>
</template>
<script>
import UlList from '@/components/UlList.vue';
export default {
    components:{
        UlList
    },
    props:[
        // 清單標題名稱
        'listTitle' ,
        // 清單項目陣列
        'listItem' ,

        'treeNumber',

        'titleBGControl',
        'id'
    ],
    data(){
        return{
            bgControl:0,
        };
    },
    created(){
        console.log( 'UlList.created.line.21',Array.isArray(this.listItem) ,this.listItem );
    },
    mounted(){
        this.bgControl=this.titleBGControl;        

    },
    methods:{
        collapseToggle(){
            // 測試有沒有 class 屬性
            // console.log( this.$refs[this.id].classList );

            //動態切換 BS5 collapse 類別
            this.$refs[this.id].classList.toggle('collapse');
        },
        getFirstSymbolString( splitString , mode ){
            let arrayResult = splitString.split('：');
            let modeA = arrayResult[0] ;
            let modeB = '';
            //將第二個項目以後的項目合併
            for(let i = 1 ; i <= arrayResult.length-1 ; i++ ){
                modeB.concat( arrayResult[i] );
                console.log( 'UlList.line.88', arrayResult[i]);
            }
            return mode == 0 ? modeA : modeB ;
        },
    },
}
</script>
<style>
    .cursor-point{
        cursor: pointer;
    }
    .bg-blue{
        background-color: rgb(138, 138, 253);
    }
    .bg-yellow{
        background-color: yellowgreen;
    }
    .bg-light-blue{
        background-color: skyblue;
    }
    .ul-title:hover{        
        animation-name: flashWord;
        animation-duration: 1s;
        animation-direction:alternate-reverse ;
        animation-iteration-count: infinite;
    }

    ul>li>ul>li{
        background-color: blue;
    }

    @keyframes flashWord {
        from {}
        to {
            background-color: rgb(253, 141, 141) ;
            color: azure;
        }
    }


    .ul-title1:hover{
        animation-name: flashWord1;
        animation-duration: 1s;
        animation-direction:alternate-reverse ;
        animation-iteration-count: infinite;
    }    
    @keyframes flashWord1 {
        from {}
        to {
            background-color: rgb(252, 152, 255) ;
            color: azure;
        }
    }    

</style>