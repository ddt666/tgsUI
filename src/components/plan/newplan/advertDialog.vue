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

      <el-form-item label="广告名称">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>


      <el-form-item label="类型" style="width: 200px">
        <el-select v-model="form.sort" placeholder="请选择客户类型">
          <el-option
            v-for="item in advert_sort"
            :key="item.sort"
            :label="item.text"
            :value="item.sort">
          </el-option>

        </el-select>
      </el-form-item>


      <el-form-item label="代理" v-if="form.sort===1">
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
    name: "advertDialog",
    data() {
      return {
        show: false,

        form: {...formInit},
        advert_sort: [{sort: 0, text: "直客"}, {sort: 1, text: "代客"}],
        title: "新建广告",
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
          this.$service.createAdvertiser(this.form).then(res => {

            if (res.code === 1000) {
              this.$message({
                message: res.msg,
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
