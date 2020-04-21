<template>
  <div class="home">
    <el-card shadow="always">
      <!-- 输入框 -->
      <el-input class="inputbox"
        type="textarea"
        :rows="1"
        placeholder="请输入标题"
        v-model="fileData.title">
      </el-input>
      <el-input class="inputbox"
        type="textarea"
        :rows="3"
        placeholder="请输入内容"
        v-model="fileData.textarea">
      </el-input>
      <!-- 上传按钮 -->
       <el-button class="subBtn" size="big" type="success" @click="submitUpload">发表</el-button>
      <!-- 照片上传区域 -->
      <el-upload
        class="upload"
        ref="upload"
        action="http://localhost:8081/blog/pic"
        list-type="picture-card"
        :with-credentials=true
        :auto-upload=false
        :on-success="uploadSuce"
        :data="getData()"
        >
        <i class="el-icon-plus">照片</i>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>
    </el-card>
      <!-- 显示区域 -->
      <div class="display">
        <el-card class="box-card" v-for="(list,index) in AllContent" :key="index">
            <!-- 头像 用户名 标题 -->
            <div class="head">
                <!-- 头像 -->
                <div class="photo">
                   <el-image
                    style="width: 100px; height: 100px"
                    :src="list.users.photo"
                    fit="fill"></el-image>
                </div>
                <!-- 用户名 标题 -->
                <div class="intitle">
                    <h3>用户：{{list.users.username}}</h3>
                    <h3>标题：{{list.title}}</h3>
                </div>
            </div>
            <!-- 图片 内容区域 -->
            <div class="content">
                <!-- 图片显示区域 -->
                <div class="pic">
                  <el-image 
                  class="picdis"
                  fit="cover"
                  :src="list.pic"></el-image>
                </div>
                <div class="say">
                  {{list.content}}
                </div>
            </div>
        </el-card>
      </div>
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


export default {
  name: 'Home',
  data () {
    return {
        fileData:{
          title:'',
          textarea:''
        },
        AllContent:[],
        dialogVisible: false,
        dialogImageUrl:''
    }
  },
  methods: {
    //获取最新博客
    displayBlog(){
      let that = this;
      axios1({
        url:'/blog/getBlogs',
        method:'get'
      }).then(res => {
        for(var i=0;i<res.data.length;i++){
           that.AllContent.push(res.data[i]);
           //修改头像的url
           that.AllContent[i].users.photo = "http://localhost:8081"+res.data[i].users.photo;
           //修改图片的url
           that.AllContent[i].pic = "http://localhost:8081"+res.data[i].pic;
        }
        console.log(that.AllContent);
      }).catch(error => {
        console.log(error);
      })
    },
    //上传数据赋值
    getData(){
      return this.fileData;
    },
    //上传内容事件
    submitUpload() {
      this.$refs.upload.submit();
    },
    //上传成功事件
    uploadSuce(response, file, fileList){
      console.log('上传成功');
      console.log(response);
    }
  },
  created () {
    //创建时获取
    this.displayBlog();
  }
}
</script>

<style>
  .home{
    margin: 10px auto;
    width: 1024px;
    height: 500px;
  }
  .inputbox{
    width: 800px;
    margin-bottom: 20px;
    font-size: 20px;
  }
  .subBtn{
    float: right;
    width: 170px;
    height: 118px;
  }
  .display{
    margin-top: 20px;
  }
  .box-card{
    width: 800px;
    margin-top: 20px;
    height: 800px;
  }
  .head{
    height: 100px;
    /* border: 1px solid black; */
    overflow: hidden;
  }
  .content{
    /* border: 1px solid black; */
  }
  .head .photo{
    float: left;
    /* border: 1px solid bisque; */
    margin-left: 20px;
  }
  .intitle{
    float: left;
    margin-left: 40px;
    /* border: 1px solid bisque; */
  }
  .picdis{
    width: 700px;
    height: 600px;
    object-fit: fill;
    padding: 20px;
    padding-bottom: 0px;
  }
  .say{
    margin-left: 20px;
  }
</style>