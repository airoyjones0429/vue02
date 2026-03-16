<template>
    <div class="text-dark" :id="id">
        
        <div :class="{
            'ul-title':true ,
            'cursor-point':true ,
        }" 
        @click="collapseToggle" data-bs-toggle="collapse">{{ listTitle }}</div>

        <div class="collapse" :ref="id">
            <!-- Vue 使用 component :is 可以動態的選擇使用 DOM 元素 -->
            <component :is="listType">
                <li v-for="(item , index) in listItem" :key="index">
                    <!-- 內容有用：分開 ，內容接收巢狀：，所以額外使用 treeNumber 做控制-->
                    <ul-list  :titleBGControl="titleBGControl+1" :id="`${id}${id}`"
                     :treeNumber="item.split('：').length -2 "
                     :list-title="item.split('：')[0]"  
                     :list-item="treeNumber > 0 ? [item.replace( `${item.split('：')[0]}：` , '' )] : ''"
                    />
                </li>
            </component>
        </div>
    </div>
</template>
<script>
import UlList from './UlList.vue';
export default {
        components:{
            UlList
        },
        props: {
            listTitle: {
                type: String,
                required: true
            },
            listItem: {
                type: Array,
                required: true
            },
            // 根據 listType 內容，將 component 渲染成 DOM 元素
            listType: {
                type: String,
                default: 'ol', // 預設為有序列表
                validator: function(value) {
                    // 只允許 'ul' 或 'ol'
                    return value === 'ul' || value === 'ol';
                }
            },
            id:{
                type:String ,
            },
            treeNumber:{},        
            titleBGControl:{},
        },
        methods:{
            collapseToggle(){
                // 測試有沒有 class 屬性
                // console.log( this.$refs[this.id].classList );

                //動態切換 BS5 collapse 類別
                this.$refs[this.id].classList.toggle('collapse');
            }
        },
    }
</script>
<style scoped>
    .cursor-point{
        cursor: pointer;
    }
    .ul-title{
        background-color: rgb(192, 255, 91);;
    }
    .ul-title:hover{
        animation-name: flashWord;
        animation-duration: 1s;
        animation-direction:alternate-reverse ;
        animation-iteration-count: infinite;
    }
    @keyframes flashWord {
        from {
            background-color: rgb(192, 255, 91);
            color: rgb(0, 0, 0);
        }
        to {
            background-color: rgb(250, 43, 129);
            color: rgb(12, 10, 173);
        }
    }

</style>