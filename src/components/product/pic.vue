<template>
     <van-swipe :autoplay="5000">
        <van-swipe-item v-for="(items,index) in pic" :key="index">
            <img :src="items" alt="">
        </van-swipe-item>
    </van-swipe>
</template>

<script>
export default {
    data(){
        return{

        }
    },
    props:['pic']
}
</script>

<style>

</style>
