<template>
    <div class="Regiestform">
        <h2>用户注册</h2>
        <el-form ref="Regiestform" :rules="rules" :model="Regiestform" label-width="80px">
            <el-form-item label="用户名" prop='username'>
                <el-input v-model="Regiestform.username" ></el-input>
            </el-form-item>
            <el-form-item label="用户密码" prop='passwd'>
                <el-input type='password' v-model="Regiestform.passwd" ></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop='checkPass'>
                <el-input type='password' v-model="Regiestform.checkPass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop='mail'>
                <el-input v-model="Regiestform.mail"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('Regiestform')">立即注册</el-button>
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
    timeout:5000
}) 
//axios1 拦截器
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
     data() {
        //  密码自定义验证规则
       var validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.Regiestform.passwd) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
      return {
        Regiestform: {
          username:'',
          passwd:'',
          checkPass:'',
          mail:''
        },
        rules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
          ],
          passwd: [
            { required: true, message: '请输入密码'},
            { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
          ],
          checkPass: [
            { required: true,validator: validatePass, trigger: 'blur' }
          ],
          mail: [
            { required: true, required: true, message: '请输入邮箱', trigger: 'blur' },
            { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change']}
          ],
        }
      }
    },
    methods: {
      submitForm(formName) {
        var that = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log(that.Regiestform);
            axios1({
              url:'/user/regiest',
              method:'post',
              data:that.Regiestform
            }).then(res => {
              //返回200 注册成功，关闭loading界面

              Loading.service().close();
              console.log(res.data == "200");
              if(res.data == "200"){
                console.log('注册成功');
                 that.$message({
                    showClose: true,
                    message: '注册成功',
                    type: 'success'
                  });
              }else{
                that.$message({
                  showClose: true,
                  message: '该邮箱已存在，请登录',
                  type: 'error'
                });
                //重定向到登陆页面
                this.$router.push('/login');
              }
            }).catch(err => {
                
              Loading.service().close();
              
              that.$message({
                  showClose: true,
                  message: '服务器出错',
                  type: 'error'
                });
              console.log("失败"+err);
            })
          } else {
            //表单错误，禁止提交
            that.$message({
                  showClose: true,
                  message: '请修改信息',
                  type: 'error'
                });
            return false;
          }
        });
      }
    }
  
}
</script>

<style>
    .Regiestform{
        width: 400px;
        margin: 45px auto;
    }
    h2{
      text-align: center;
      margin-bottom: 30px;
    }
</style>