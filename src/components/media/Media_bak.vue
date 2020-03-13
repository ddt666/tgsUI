<template>
  <div>
    <el-row>
      <h1>媒体页面</h1>
    </el-row>


    <el-row>
      <el-col :span="4">

        <router-link :to="{ name: 'NewMedia'}">
          <el-button type="primary">新建媒体</el-button>
        </router-link>


      </el-col>
    </el-row>


    <el-table
      :data="media_list"
      stripe
      v-loading="loading"
      size="medium"
      style="width: 900px">
      <el-table-column
        fixed
        prop="name"
        label="名称"
        width="300">
        <template slot-scope="scope">

          <!--<span style="margin-left: 10px">{{ scope.row.name }} - {{scope.row.agent}}</span>-->
          <span style="margin-left: 10px">{{ scope.row.agent===null ||scope.row.agent === "" ? scope.row.name : scope.row.name +" - " + scope.row.agent}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="sort"
        label="类型"
        width="300">
        <template slot-scope="scope">
          <el-tag type="success" v-if="scope.row.sort_info.sort===0">直</el-tag>
          <el-tag v-if="scope.row.sort_info.sort===1">代</el-tag>
        </template>
      </el-table-column>

      <el-table-column
        fixed="right"
        label="操作"
      >
        <template slot-scope="scope">

          <router-link :to="{name:'EditMedia',params:{id:scope.row.id}}">
            <el-button type="text" size="small">编辑</el-button>
          </router-link>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination style='margin-top: 10px'
                   background
                   :page-sizes="[1, 2, 3, 4]"
                   :page-size="requestParams.pageSize"
                   :current-page.sync="requestParams.currentPage"
                   layout="total, sizes, prev, pager, next, jumper"
                   :total="dataTotal"
                   @size-change="sizeChange"
                   @current-change='getData'/>
    <!--/ 分页 -->


    <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
    <div style="margin: 15px 0;"></div>
    <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
      <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}
      </el-checkbox>
    </el-checkbox-group>

  </div>
</template>

<script>


  const formInit = {
    id: null,
    name: "",
    agent: "",
    sort: 0

  };

  const cityOptions = ['名称', '类型'];
  export default {
    name: "Media",

    data() {
      return {
        media_list: [],
        dialogFormVisible: false,
        form: {...formInit},
        media_sort: null,
        formLabelWidth: "120px",

        loading: false,


        dataTotal: 0,
        //数据请求的参数
        requestParams: {
          pageSize: 2,//分页大小
          currentPage: 1,//当前页
          sortProp: '',
          sortOrder: '',


        },
        isIndeterminate: true,
        checkAll: false,
        checkedCities: ['名称'],
        cities: cityOptions,
      };
    },
    methods: {

      //获取媒体列表
      getData() {
        this.loading = true
        this.$service.getMedia(this.requestParams).then(res => {
            console.log(this.requestParams)
            if (res.code === 1000) {
              this.loading = false
              this.media_list = res.data.results;
              this.dataTotal = res.data.count

              console.log(this.media_list)
            } else {
              console.log(res.msg)
            }


          }
        )
      },

      getMediaSort() {
        this.$axios.mediaSort().then(
          res => {
            this.media_sort = res.data
            console.log(res)
          }
        )
      },
      createNewMedia() {
        this.dialogFormVisible = true;
        this.getMediaSort()
      },

      //分页容量大小发生变化时
      sizeChange(value) {
        this.requestParams.pageSize = value
        this.requestParams.currentPage = 1
        this.getData()
      },

      handleCheckAllChange(val) {
         console.log("checkbox_all",val)
        this.checkedCities = val ? cityOptions : [];
        this.isIndeterminate = false;
      },
      handleCheckedCitiesChange(value) {
        console.log("checkbox",value)
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.cities.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
      }

    },
    created() {
      this.getData()

    }
  }
</script>

<style scoped>

</style>
