<template>
    <div class="card img-fluid" style="width:100%;">
        <img class="card-img-top" :src="topImage" alt="Card image" >
        <div class="card-img-overlay">
            <!-- slot 標籤對，讓主組件可以直接放【其他 HTML 標籤】而不會被子組件樣式綁定 -->
            <slot></slot>
        </div>
    </div>
</template>

<script>
import {images} from '../../myCollection';
export default {
    data(){
        return{
            topImage: images.centerLogin ,
        };
    },
}
</script>

<style scoped>
    .card-img-top{
        /* 注意!! 固定高度前，若已設定 RSW 反應，可能要重新再設定一次 */
        height: 95vh;
        width: 100%;

    }

</style>