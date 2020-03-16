<template>
  <el-menu
    :default-active='$route.path'
    class="el-menu-vertical-demo"
    :router="true"
     mode="horizontal"
    background-color="#304156"
    text-color="#fff"
    active-text-color="#409EFF"
    style='border:none'
    @open="handleOpen"
    @close="handleClose"
  >


    <el-menu-item index="/plan/list">
      <i class="el-icon-date"></i>
      <span slot="title">投放管理</span>
    </el-menu-item>
    <el-submenu index="/statement">

      <template slot="title">
        <i class="el-icon-wallet"></i>
        <span>对账</span></template>
      <el-menu-item index="/statement/media">
        <template slot="title">
          <i class="el-icon-money"></i>
          <span>媒体对账</span>
        </template>

      </el-menu-item>
      <el-menu-item index="/statement/advert">
        <template slot="title">
          <i class="el-icon-coin"></i>
          <span>客户对账</span>
        </template>
      </el-menu-item>
    </el-submenu>
    <el-submenu index="2" style="float: right;margin-right: 60px;">

      <template slot="title">{{$store.state.userInfo.username}}</template>
      <el-menu-item @click="handlerLogout">登出</el-menu-item>

    </el-submenu>

  </el-menu>
</template>

<script>
  export default {
    name: "menuTree",
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
       handlerLogout() {
        this.$store.dispatch("logout").then(res => {

        })
      }
    }
  }
</script>

<style scoped>

</style>
