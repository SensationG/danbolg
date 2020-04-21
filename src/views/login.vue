<template>
  <div class="LoginForm">
        <h2>用户登陆</h2>
        <el-form ref="form" :model="LoginForm" label-width="80px">
            <el-form-item label="邮箱">
                <el-input v-model="LoginForm.mail" placeholder="请输入邮箱"></el-input>
            </el-form-item>
             <el-form-item label="密码">
                <el-input type="password" v-model="LoginForm.password" placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">登陆</el-button>
            </el-form-item>
        </el-form>
  </div>
</template>

<script>
import axios from 'axios'
//loading 服务
import { Loading } from 'element-ui';

//创建实例
const axios1 = axios.create({
    baseURL:'http://localhost:8081',  //基础的路径设置，之后每次实例请求就可以简写
    timeout:5000,
    withCredentials:true
}) 

axios1.interceptors.request.use(suce => {  
    //请求发送成功来到这里
    //loading 等待界面
    Loading.service();
    return suce; //形参包含请求的信息，必须返回这请求，否则就无法把真正请求发出去
},err => {
    //请求发送失败来到这里，提示错误信息
    alert('请求发送失败');
})

export default {
    data () {
        return {
            LoginForm: {
                password:'',
                mail:''
            }
        
        }
    },
    methods: {
      //提交表单
      onSubmit() {
        let that = this;
        console.log(that.LoginForm);
        axios1({
            url:'/login',
            method:'post',
            data:that.LoginForm
        }).then(res => {
            Loading.service().close();
            console.log(res);
            console.log(res.data.status);
            if(res.data.status == 200){
                that.$message({
                    showClose: true,
                    message: '登陆成功',
                    type: 'success'
                });
                //重定向到登陆页面
                //this.$router.push('/User');
            }else if(res.data.status == 444){
                that.$message({
                    showClose: true,
                    message: '用户名/密码错误',
                    type: 'error'
                });
            }else{
                that.$message({
                    showClose: true,
                    message: '错误',
                    type: 'error'
                });
            }

        }).catch(err => {
            Loading.service().close();
            that.$message({
                showClose: true,
                message: '服务器错误',
                type: 'error'
            });
        })

      }
    }
}
</script>

<style>
    .LoginForm{
        width: 400px;
        margin: 45px auto;
    }
    h2{
      text-align: center;
      margin-bottom: 30px;
    }
</style>