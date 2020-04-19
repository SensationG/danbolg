<template>
    <div class="loginForm">
        <el-form ref="Loginform" :rules="rules" :model="Loginform" label-width="80px">
            <el-form-item label="用户名" prop='username'>
                <el-input v-model="Loginform.username" ></el-input>
            </el-form-item>
            <el-form-item label="用户密码" prop='passwd'>
                <el-input type='password' v-model="Loginform.passwd" ></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop='checkPass'>
                <el-input type='password' v-model="Loginform.checkPass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop='mail'>
                <el-input v-model="Loginform.mail"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('Loginform')">立即注册</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import axios from 'axios'
//创建实例
const axios1 = axios.create({
    baseURL:'http://localhost:8081',  //基础的路径设置，之后每次实例请求就可以简写
    timeout:5000
}) 
export default {
     data() {
        //  密码自定义验证规则
       var validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.Loginform.passwd) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
      return {
        Loginform: {
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
            console.log(that.Loginform);
            axios1({
              url:'/user/regiest',
              method:'post',
              data:that.Loginform
            }).then(res => {
              //返回200 注册成功
              if(res.status == 200){
                console.log('注册成功');
                 that.$message({
                    showClose: true,
                    message: '注册成功',
                    type: 'success'
                  });
              }else{
                that.$message({
                  showClose: true,
                  message: '注册失败，请重试',
                  type: 'error'
                });
              }
            }).catch(err => {
              that.$message({
                  showClose: true,
                  message: '服务器出错',
                  type: 'error'
                });
              console.log("失败"+err);
            })
          } else {
            console.log('error submit!!');
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
    .loginForm{
        width: 400px;
        margin: 55px auto;
    }
</style>