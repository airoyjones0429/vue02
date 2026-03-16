<template>
        <h3>H3</h3>
        <!-- overflow-y 要設定 auto 垂直卷軸才會自動出現 -->
        <div style="height:50% ;background-color: blue; overflow-y: auto;">
            <div style="height: 1000px;">
                這個內部容器高度為 1000px，父容器 overflow-y 要設定 auto 垂直卷軸才會自動出現，<br>
                如果設定為 visible 不會出現垂直卷軸，只會將內容全部展開在畫面上歐!!
            </div>
        </div>
</template>
<script>

</script>