<template>
  <el-dialog
    :title="title"
    :visible.sync="show"
    width="30%"
    :close-on-press-escape='false'
    @open="openDialog"
    @close="closeDialog"
  >
    <el-form :model="form" label-width="100px" style="width: 300px;margin-left: 46px">

      <el-form-item label="端口名称">
        <el-input v-model="form.title" autocomplete="off"></el-input>
      </el-form-item>


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
    title: null

  }
  export default {
    name: "portDialog",
    data() {
      return {
        show: false,

        form: {...formInit},
        media_sort: null,
        title: "新建端口",
        updated: false,
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
        closeDialog() {
          this.form = {...formInit}
          if (this.updated) {
            this.$emit('update')
          }
          this.updated = false;
        },
        open() {
          this.show = true;

          return new Promise((resolve, reject) => {

            this.resolve = resolve

          })
        },


        submit() {
          console.log(this.form)
          this.$service.createPort(this.form).then(res => {

            if (res.code === 1000) {
              this.$message({
                message: '创建端口成功',
                type: 'success'
              });
              this.show = false;
              this.updated = true
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
