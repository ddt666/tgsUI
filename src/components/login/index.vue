<template>
  <el-card class="box-card">
    <el-form ref="loginForm" :model="loginForm" label-width="60px" size="medium">
      <h3 class="login-title">欢迎登录</h3>
      <el-form-item label="账号">
        <el-input v-model="loginForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" v-model="loginForm.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handlerLogin" :loading="loading">登录</el-button>

      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
  export default {
    name: "index",
    data() {
      return {
        loginForm: {
          username: '',
          password: ''
        },
        loading: false
      }
    },
    methods: {
      handlerLogin() {
        this.loading = true

        this.$store.dispatch("login",this.loginForm).then(
          res=>{
             console.log("res",res)
            this.$router.push({name: "PlanList"})
          }
        ).catch(() => {
            this.loading = false
          })

      }
    }
  }
</script>

<style scoped>
  .box-card {
    width: 400px;
    height: 300px;

    margin: 180px auto;
    padding: 25px;
  }

  .login-title {
    text-align: center;
    margin: 0 auto 40px auto;
    color: #303133;
  }

</style>
