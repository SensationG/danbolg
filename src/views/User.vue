<template>
  <div id="main">
      <div v-show="!isLogin">
            您还没有登陆哦
      </div>
      <div  v-show="isLogin">
        <div class="left">
            <div class="photo">
                    <el-image
                        style="width: 150px; height: 150px"
                        :src="url"    
                    ></el-image>
                    <el-upload
                        class="upload-demo"
                        action="http://localhost:8081/user/upload"
                        with-credentials=true
                        :show-file-list="false"
                        :on-success="updatePhotoSucess"
                    >
                        <el-button size="small" type="primary">更换头像</el-button>
                    </el-upload>
            </div>

            <div class="person">
                <ul>
                    <li>会员id: {{user.id}}</li>
                    <li>邮箱: {{user.mail}}</li>
                    <li>用户名: {{user.username}}</li>       
                </ul>
            </div>
        </div>
        <div class="right">
            显示区域
        </div>
      </div>
  </div>
</template>

<script>
import axios from 'axios'

//loading 服务
import { Loading } from 'element-ui';
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
            user:'',
            url: '',
            isLogin:false,
        }
    },
    //vue实例的生命周期方法
    created () {
        this.getUser();
    },
    methods:{
        //更新照片成功后执行
        updatePhotoSucess(response, file, fileList){
            this.getUser();
        },
        //获取用户信息的方法
        getUser(){
            let that = this;
            axios1({
                url:'/user/getUser',
                method:'get',
            }).then(res => {
                Loading.service().close();
                that.isLogin = true;
                that.user = res.data;
                //头像路径
                that.url = "http://localhost:8081"+that.user.photo;
                console.log(that.url);   
            }).catch(error => {
                Loading.service().close();
                //获取错误返回的状态码
                let status = error.response.status;
                if(status == 414){
                    that.$message({
                        showClose: true,
                        message: '未登录',
                        type: 'error'
                    });
                    that.isLogin=false;
                }else{
                    that.$message({
                        showClose: true,
                        message: '错误',
                        type: 'error'
                    });
                }
            })
        }
    }
}
</script>

<style>
#main{
    margin: 10px auto;
    width: 1024px;
}
.left{
    display: inline-block;
    /* border: 1px solid slateblue; */
    width: 400px;
}
.right{
    float: right;
    width: 620px;
    /* border: 1px solid slateblue; */
}
.left .photo{
    float: left;
    /* border: 1px solid slateblue; */
    width: 195px;
    text-align: center;
    padding-top: 20px;
}
.left .person{
    float: right;
    /* border: 1px solid slateblue; */
    width: 200px;
    font-size: 19px;
    font-family: fantasy;
    padding-top: 20px;
}

</style>