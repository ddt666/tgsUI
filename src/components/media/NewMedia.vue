<template>
  <div>
    <h1>{{title}}</h1>

    <el-form :model="form" label-width="100px">
      <el-row>
        <el-col :span="4">
          <el-form-item label="媒体名称" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="3">
          <el-form-item label="类型" :label-width="formLabelWidth">
            <el-select v-model="form.sort" placeholder="请选择媒体类型">
              <el-option
                v-for="item in media_sort"
                :key="item.sort"
                :label="item.text"
                :value="item.sort">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="4">
          <el-form-item label="代理" :label-width="formLabelWidth" v-if="form.sort===1">
            <el-input v-model="form.agent" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="save">保存</el-button>
            <el-button @click="back">取消</el-button>
          </el-form-item>
        </el-col>
      </el-row>

    </el-form>
  </div>
</template>

<script>
  const formInit = {
    id: null,
    name: "",
    agent: "",
    sort: 0

  }
  export default {
    name: "NewMedia",
    data() {
      return {
        form: {...formInit},
        media_sort: null,
        formLabelWidth: "120px"
      }
    },
    methods: {
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

      InitData() {
        if (this.isEdit) {
          this.$service.getMediaRetrieve(this.$route.params.id).then(res => {
            if (res.code === 1000) {
              this.form = {...res.data}
              console.log(res.data)
            }
          })
        } else {

        }
      },
      back() {
        this.$router.go(-1);//返回上一层
      },
      save() {
        if (this.isEdit) {
          this.$service.editMedia(this.form).then(res => {
            if (res.code === 1000) {
              this.$message({
                message: '修改成功',
                type: 'success'
              });
              this.$router.push({name: "Media"})
            }
          })
        } else {
          this.$service.CreateNewMedia(this.form).then(res => {

            if (res.code === 1000) {
              this.$message({
                message: '创建成功',
                type: 'success'
              });
              this.$router.push({name: "Media"})
            } else {
              console.log(res)
            }

          })
        }

      }
    },
    created() {
      this.getMediaSort()
    },
    mounted() {
      this.InitData()
    },
    computed: {
      isEdit() {
        console.log(this.$route.params.id)
        return this.$route.params.id ? true : false
      },
      title() {
        return this.isEdit ? "编辑媒体" : "新建媒体"
      }
    }
  }
</script>

<style scoped>

</style>
