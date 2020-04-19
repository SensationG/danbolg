<template>
    <div class="block pic">
        <span class="demonstration">演示</span>
        <el-carousel height="150px">
            <el-carousel-item v-for="item in 4" :key="item">
                <h3 class="small">{{ item }}</h3>
            </el-carousel-item>
        </el-carousel>
    </div>
</template>

<script>
export default {
    data() {
      return {
        value: null,
        iconClasses: ['icon-rate-face-1', 'icon-rate-face-2', 'icon-rate-face-3']
         // 等同于 { 2: 'icon-rate-face-1', 4: { value: 'icon-rate-face-2', excluded: true }, 5: 'icon-rate-face-3' }
      }
    }
}
</script>

<style>
.pic{
    margin: 5px auto;
    width: 1024px;
}
</style>