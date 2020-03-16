<template>
  <el-menu
    :default-active='$route.path'
    class="el-menu-vertical-demo"
    :router="true"

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

  </el-menu>
</template>

<script>
  export default {
    name: "menuTree",
    methods:{
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>

<style scoped>

</style>
