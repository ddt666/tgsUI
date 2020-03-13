<template>
  <el-dialog
    :title="title"
    :visible.sync="show"
    width="30%"
    :close-on-press-escape='false'
    @open="openDialog"
  >
    <el-form :model="form" label-width="100px" style="width: 300px;margin-left: 46px">

      <el-form-item label="媒体名称">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>


      <el-form-item label="类型" style="width: 200px">
        <el-select v-model="form.sort" placeholder="请选择媒体类型">
          <el-option
            v-for="item in media_sort"
            :key="item.sort"
            :label="item.text"
            :value="item.sort">
          </el-option>
        </el-select>
      </el-form-item>


      <el-form-item label="代理">
        <el-input v-model="form.agent" autocomplete="off"></el-input>
      </el-form-item>
      <!--<el-form-item>-->
      <!--<el-button type="primary" @click="save">保存</el-button>-->
      <!--<el-button @click="back">取消</el-button>-->
      <!--</el-form-item>-->

    </el-form>
    <span slot="footer" class="dialog-footer">
    <el-button @click="show = false">取 消</el-button>
    <el-button type="primary" @click="submit()">确 定</el-button>
  </span>
  </el-dialog>

</template>

<script>
  const formInit = {
    id: null,
    name: "",
    agent: "",
    sort: 0

  }
  export default {
    name: "EditDialog",
    data() {
      return {
        show: false,

        form: {...formInit},
        media_sort: null,
        title: "对话框",
      }
    },
    methods:
      {//打开对话框时执行的方法
        openDialog() {
          //console.log("this.isEdit",this.isEdit)
          //console.log("this.form.id",this.form.id)
          // console.log("打开对话框")
          // console.log(this.resolve,this)
          //这里调用nextTick，执行父组件传来的方法
          this.$nextTick(
            () => {
              if (this.resolve) {
                //this对应父组件that
                this.resolve(this)
              }
            }
          )
        },
        open() {
          this.show = true;

          return new Promise((resolve, reject) => {

            this.resolve = resolve
          })
        },
        initData() {
          console.log("initData")
          this.getMediaSort()
        },
        getMediaSort() {
          this.$service.mediaSort().then(
            res => {

              if (res.code === 1000) {
                this.media_sort = res.data

              } else {
                console.log(res)
              }

            }
          )
        },
        submit() {
          console.log(this.form)
          this.$service.CreateNewMedia(this.form).then(res => {

            if (res.code === 1000) {
              this.$message({
                message: '创建成功',
                type: 'success'
              });

            } else {
              console.log(res)
            }

          })
        }
      },
    mounted() {

    }
  }
</script>

<style scoped>

</style>
