<template>
  <div>
    <el-row style="margin-bottom: 20px">
      <h1>媒体页面</h1>
    </el-row>


    <el-row style="margin-bottom: 20px">
      <el-col :span="4">

        <router-link :to="{ name: 'NewMedia'}">
          <el-button type="primary">新建媒体</el-button>
        </router-link>


      </el-col>
    </el-row>

    <el-form :inline="true" v-model="queryParams">
      <el-form-item>
        <el-input
          placeholder="请输入媒体名称"
          v-model="queryParams.name"
          clearable>
        </el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="query">查询</el-button>
      </el-form-item>
    </el-form>


    <el-row style="margin-bottom: 20px">
      <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
      <!--<div style="margin: 15px 0;"></div>-->
      <el-checkbox-group v-model="checkedColumn" @change="handleCheckedCitiesChange"
                         style="display: inline;margin-left: 30px">
        <el-checkbox v-for="col in columns" :label="col" :key="col">{{col}}
        </el-checkbox>
      </el-checkbox-group>
    </el-row>

    <el-table
      :data="media_list"
      stripe
      v-loading="loading"
      size="medium"
      style="width: 100%">
      <el-table-column
        fixed
        prop="name"
        label="名称"
         width="200px"
         v-if="checkedColumn.indexOf('名称')>-1">
        <template slot-scope="scope">

          <!--<span style="margin-left: 10px">{{ scope.row.name }} - {{scope.row.agent}}</span>-->
          <span style="margin-left: 10px">{{ scope.row.agent===null ||scope.row.agent === "" ? scope.row.name : scope.row.name +" - " + scope.row.agent}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="sort"
        label="类型"
        width="200px"
         v-if="checkedColumn.indexOf('类型')>-1">
        <template slot-scope="scope">
          <el-tag type="success" v-show="scope.row.sort_info.sort===0">直</el-tag>
          <el-tag v-show="scope.row.sort_info.sort===1">代</el-tag>
        </template>
      </el-table-column>
       <el-table-column
        prop="sort"
        label="类型"
        width="200px"
         v-if="checkedColumn.indexOf('类型')>-1">
        <template slot-scope="scope">
          <el-tag type="success" v-show="scope.row.sort_info.sort===0">直</el-tag>
          <el-tag v-show="scope.row.sort_info.sort===1">代</el-tag>
        </template>
      </el-table-column>

       <el-table-column
        prop="sort"
        label="类型"
        width="200px"
         v-if="checkedColumn.indexOf('类型')>-1">
        <template slot-scope="scope">
          <el-tag type="success" v-show="scope.row.sort_info.sort===0">直</el-tag>
          <el-tag v-show="scope.row.sort_info.sort===1">代</el-tag>
        </template>
      </el-table-column>

       <el-table-column
        prop="sort"
        label="类型"
        width="200px"
         v-if="checkedColumn.indexOf('类型')>-1">
        <template slot-scope="scope">
          <el-tag type="success" v-show="scope.row.sort_info.sort===0">直</el-tag>
          <el-tag v-show="scope.row.sort_info.sort===1">代</el-tag>
        </template>
      </el-table-column>

       <el-table-column
        prop="sort"
        label="类型"
        width="200px"
         v-if="checkedColumn.indexOf('类型')>-1">
        <template slot-scope="scope">
          <el-tag type="success" v-show="scope.row.sort_info.sort===0">直</el-tag>
          <el-tag v-show="scope.row.sort_info.sort===1">代</el-tag>
        </template>
      </el-table-column>

       <el-table-column
        prop="sort"
        label="类型"
        width="200px"
         v-if="checkedColumn.indexOf('类型')>-1">
        <template slot-scope="scope">
          <el-tag type="success" v-show="scope.row.sort_info.sort===0">直</el-tag>
          <el-tag v-show="scope.row.sort_info.sort===1">代</el-tag>
        </template>
      </el-table-column>


       <el-table-column
        prop="sort"
        label="类型"
        width="200px"
         v-if="checkedColumn.indexOf('类型')>-1">
        <template slot-scope="scope">
          <el-tag type="success" v-show="scope.row.sort_info.sort===0">直</el-tag>
          <el-tag v-show="scope.row.sort_info.sort===1">代</el-tag>
        </template>
      </el-table-column>



       <el-table-column
        prop="sort"
        label="类型"
        width="200px"
         v-if="checkedColumn.indexOf('类型')>-1">
        <template slot-scope="scope">
          <el-tag type="success" v-show="scope.row.sort_info.sort===0">直</el-tag>
          <el-tag v-show="scope.row.sort_info.sort===1">代</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="200px"
        v-if="checkedColumn.indexOf('操作')>-1">
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


  </div>
</template>

<script>


  const formInit = {
    id: null,
    name: "",
    agent: "",
    sort: 0

  };

  const columnOptions = ['名称', '类型', '操作'];
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

        //查询条件字段
        queryParams: {
          name: '',//代理名称

        },

        //数据请求的参数
        requestParams: {
          pageSize: 2,//分页大小
          currentPage: 1,//当前页
          sortProp: '',
          sortOrder: '',


        },
        isIndeterminate: true,
        checkAll: false,
        checkedColumn: columnOptions,
        columns: columnOptions,
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

      //查询方法
		query({ key }={}){

        console.log("key",key)
			if(key){
				let value = this.queryParams[key]
				this.requestParams = {...this.requestParams,[key]:value}
			}else{
				this.requestParams = {...this.requestParams,...this.queryParams}
			}
			this.requestParams.currentPage = 1
			this.getData()
		},

      handleCheckAllChange(val) {

        this.checkedColumn = val ? columnOptions : [];
        this.isIndeterminate = false;
      },
      handleCheckedCitiesChange(value) {

        let checkedCount = value.length;
        this.checkAll = checkedCount === this.columns.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.columns.length;
      }

    },
    created() {
      this.getData()

    }
  }
</script>

<style scoped>

</style>
