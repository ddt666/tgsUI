<template>
  <el-container style='height:100%'>
    <el-header style="padding:0px;box-shadow: rgba(0, 0, 0, 0.4) 0px 0px 8px;z-index: 1;line-height: 60px;background-color: rgb(48, 65, 86); border: none;"
               :height="headerHeight" ref='elHeader'>
      <el-row>
        <el-col :span="2">
          <div style="width: 200px;text-align: center">logo</div>
        </el-col>
        <el-col :span="22">
          <el-menu class="el-menu-demo" mode="horizontal"
                   background-color="#304156"
                    text-color="#fff"
                    active-text-color="#409EFF"
                    style='border:none'
          >

            <el-submenu index="2" style="float: right;margin-right: 60px;">

              <template slot="title">{{$store.state.userInfo.username}}</template>
              <el-menu-item @click="handlerLogout">登出</el-menu-item>

            </el-submenu>

          </el-menu>
        </el-col>
      </el-row>


    </el-header>
    <el-container style="overflow: auto;">


      <el-aside style='width:200px;box-shadow:0px 0px 10px  rgba(0,0,0,.12);z-index: 1'>
        <el-scrollbar class='_scroll'>
          <menu-tree></menu-tree>

        </el-scrollbar>
      </el-aside>

      <el-container>


        <el-main style="padding: 25px 50px">

          <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom: 25px">
            <el-breadcrumb-item
            v-for='m in $route.matched'
            :key='m.meta.id' :to='m.path?m.path:"/"'
          >
            {{m.meta.title}}
          </el-breadcrumb-item>
          </el-breadcrumb>
           <el-divider></el-divider>
          <router-view></router-view>

        </el-main>
        <el-footer height='35px' style='text-align: center;border-top:1px solid #EBEEF5'>
          <el-button type='text'>Copyright</el-button>
          <!-- <el-button type='text' @click='contactDialog=true'>系统帮助</el-button> -->
        </el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
  import menuTree from './menuTree'

  export default {
    name: "Layout",
    data() {
      return {
        headerHeight: '60px',
      }
    },
    components: {
      menuTree
    },
    mounted() {
      this.resize();
      window.addEventListener('resize', this.resize);
    },
    methods: {
      resize() {
        console.log(this.$refs.elHeader.$el.clientHeight)
        this.headerHeight = this.$refs.elHeader.$el.clientHeight + 'px'
      },
      handlerLogout() {
        this.$store.dispatch("logout").then(res => {

        })
      }
    }
  }
</script>

<style>
  ._scroll {
    height: 100%;
  }

  ._scroll .el-scrollbar__wrap {
    overflow-x: auto;
  }
</style>
