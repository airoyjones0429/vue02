<template>
    會員中心
    <div>
        <div v-for="(fieldContent , fieldName , index ) in getUShoppingData" :key="fieldName">
            <p>{{ index }}：{{ fieldName }}</p>
            <member-item1 :order="fieldContent" />
        </div>
        

    </div>

    
</template>

<script>
    import { mapGetters , mapActions  } from 'vuex';
    import { myFirebaseUserShopping } from '@/myCollection'
    import MemberItem1 from './MemberItem1.vue';
    export default {
        components:{
            MemberItem1
        },
        mounted(){
            this.loadUserShoppingData( { collection_name:myFirebaseUserShopping , emailDocName:this.currentUser.email});
        },
        computed:{
            // 取得使用者帳號資訊、取得使用者購物資訊
            ...mapGetters(['currentUser','getUShoppingData',]),
        },
        methods:{
            // { collection_name , emailDocName }
            ...mapActions(['loadUserShoppingData']),
        },
    }


</script>

<style scoped>

    div>div{
        background-color: aquamarine;
    }
    div>p{
        background-color: blue;
    }

</style>