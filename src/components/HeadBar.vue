<template>
    <div id="headbar">
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-menu-item index="1" @click="toHome">主页</el-menu-item>
        <el-menu-item index="2" @click="toUser">个人中心</el-menu-item>
        <el-menu-item index="3" @click="toRegiest">用户注册</el-menu-item>
        <el-menu-item index="4" @click="toLogin">用户登陆</el-menu-item>
        <el-menu-item index="5" disabled>正在开发</el-menu-item>
        </el-menu>
    </div>
</template>

<script>
export default {
    data () {
        return {
             activeIndex: '1',
            //  activeIndex2: '1'
        }
    },
    methods: {
        handleSelect(key, keyPath) {
            console.log(key, keyPath);
        },
        toRegiest(){
            this.$router.push('/regiest');
        },
        toHome(){
            this.$router.push('/home');
        },
        toUser(){
            this.$router.push('/user')
        },
        toLogin(){
            this.$router.push('/login')
        }
    }
}
</script>

<style>
  #headbar{
      width: 1024px;
      margin: 5px auto;
  }
</style>