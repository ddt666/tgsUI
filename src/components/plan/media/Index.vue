<template>
  <div>

    <el-form :model="form" label-width="100px">
      <el-row>

          <el-form-item label="媒体名称">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>

      </el-row>

      <el-row>
        <el-col :span="3">
          <el-form-item label="类型">
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

      <!--<el-row>-->
        <!--<el-col :span="4">-->
          <!--<el-form-item label="代理" v-if="form.sort===1">-->
            <!--<el-input v-model="form.agent" autocomplete="off"></el-input>-->
          <!--</el-form-item>-->
          <!--<el-form-item>-->
            <!--<el-button type="primary" @click="">保存</el-button>-->
            <!--<el-button @click=""></el-button>-->
          <!--</el-form-item>-->
        <!--</el-col>-->
      <!--</el-row>-->
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
    name: "Index",
    data() {
      return {
        form: {...formInit},
        media_sort: null,

      }
    },

  }
</script>

<style scoped>

</style>
