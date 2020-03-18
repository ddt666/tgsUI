<template xmlns:el-col="http://www.w3.org/1999/html">
  <div>


    <el-row type="flex" justify="center" style="margin-bottom: 40px">

      <el-button-group>

        <el-button type="primary" icon="el-icon-plus" @click="$router.push({name:'NewPlan'})">
          新建计划
        </el-button>


        <el-button icon="el-icon-upload2" type="info">数据导入</el-button>

        <el-button icon='el-icon-download' type="warning">数据导出</el-button>

      </el-button-group>


    </el-row>


    <el-row>
      <el-col :span="18" :offset="2">
        <el-form inline size="mini" class="query">

          <el-form-item label="媒体">
            <el-select v-model="queryParams.media" filterable clearable placeholder="请选择">
              <el-option
                v-for="(item,index) in mediaList"
                :key="index"
                :label="item.full_name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>


          <el-form-item label="广告">
            <el-select v-model="queryParams.advertiser" filterable clearable placeholder="请选择">
              <el-option
                v-for="item in advertList"
                :key="item.id"
                :label="item.full_name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>


          <el-form-item label="日期">
            <el-date-picker
              value-format="timestamp"
              v-model="dateRange"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>


          <el-form-item label="状态">
            <el-select v-model="queryParams.status" placeholder="请选择">
              <el-option
                v-for="item in statusList"
                :key="item.id"
                :label="item.title"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <div>

          </div>
        </el-form>
      </el-col>
      <el-col :span="4">
        <el-button-group>
          <el-button type="primary" @click="query" icon="el-icon-search">查询</el-button>

          <el-tooltip content='显示更多查询条件' placement='top'>
            <el-button>
              <i class="el-icon-arrow-down"></i>
            </el-button>
          </el-tooltip>
        </el-button-group>
      </el-col>
    </el-row>

    <el-divider>

      <el-link :underline="false"
               type="Info" @click="optionsShow=!optionsShow"><i
        :class="{'el-icon-caret-bottom':optionsShow,'el-icon-caret-top':!optionsShow}"></i>展示选项
      </el-link>
      <!--<el-button icon="el-icon-search" circle></el-button>-->
    </el-divider>
    <div v-show="optionsShow">
      <el-card shadow="never" style="margin-bottom: 20px;background-color: #f7f7f7;">
        <el-row :gutter="10" style="margin-bottom: 10px">
          <el-col :span="6">
            <span style="font-size: 14px;float: right">媒体：</span>
          </el-col>

          <el-col :span="18">

            <el-checkbox :indeterminate="m_isIndeterminate" v-model="m_checkAll"
                         @change="m_handleCheckAllChange"
                         style="margin-right: 28px"
            >全选
            </el-checkbox>
            <!--<div style="margin: 15px 0;"></div>-->
            <el-checkbox-group v-model="m_checkedColumn" @change="m_handleCheckedColumnChange"
                               style="display: inline;">
              <el-checkbox v-for="item in m_columnsOption" :label="item.prop" :key="item.prop"> {{item.label}}
              </el-checkbox>
            </el-checkbox-group>
          </el-col>


        </el-row>

        <el-row :gutter="10" style="margin-bottom: 10px">

          <el-col :span="6">
            <span style="font-size: 14px;float: right">广告：</span>
          </el-col>
          <el-col :span="18">

            <el-checkbox :indeterminate="a_isIndeterminate" v-model="a_checkAll"
                         @change="a_handleCheckAllChange"
                         style="margin-right: 28px"
            >全选
            </el-checkbox>
            <!--<div style="margin: 15px 0;"></div>-->
            <el-checkbox-group v-model="a_checkedColumn" @change="a_handleCheckedColumnChange"
                               style="display: inline;">
              <el-checkbox v-for="item in a_columnsOption" :label="item.prop" :key="item.prop"> {{item.label}}
              </el-checkbox>
            </el-checkbox-group>
          </el-col>


        </el-row>


      </el-card>
      <el-divider></el-divider>
    </div>

    <el-row style="height: 32px;margin-bottom: 24px">
      <el-col :span="8" style="min-height: 10px">

        <div >
          <el-button v-show="deleteShow" type="danger" icon="el-icon-delete" plain>批量删除</el-button>
        </div>


      </el-col>
      <el-col :span="8" style="text-align: center">
        <el-button-group v-if="actionsShow">
          <el-tooltip effect="dark" content="编辑计划" placement="left">
            <el-button icon="el-icon-edit"
                       @click="$router.push({name:'EditPlan',params:{plan_id:singleRowData.id}})"
                       type="primary"
                       plain
            >编辑计划
            </el-button>
          </el-tooltip>
          <el-tooltip effect="dark" content="数据录入" placement="top">
            <el-button icon="el-icon-s-data"
                       type="success"
                       plain
                       @click="$router.push({name:'PlanSettlement',params:{plan_id:singleRowData.id},
             query: { settlement_id: singleRowData.settlement_info.id }})">数据录入
            </el-button>
          </el-tooltip>
          <el-tooltip effect="dark" content="拷贝计划" placement="right">
            <el-button icon="el-icon-copy-document"
                       type="warning"
                       plain
                       @click="$router.push({name:'CopyPlan',query:{id:singleRowData.id}})">拷贝计划
            </el-button>
          </el-tooltip>
        </el-button-group>
      </el-col>
      <el-col :span="6" style="text-align: center">
      </el-col>
    </el-row>
    <!--:header-row-style="{color:'red'}"-->

    <el-table
      :data="planTable"
      highlight-current-row
      style="font-size: 14px"
      :row-style="{height:'50px'}"
      :cell-style="{padding:'5px 0px'}"
      height="600"
      v-loading="loading"
      show-summary
      :summary-method="getSummaries"
      @current-change="handleCurrentChange"
      @selection-change="handleSelectionChange"
      ref="tableDataRef"
      :header-cell-style="headerRowStyle"
    >
      <el-table-column
        type="selection"
        fixed
        width="85px" align="center">
      </el-table-column>
      <el-table-column
        label="ID"
        prop="id" width="80px" align="center">
      </el-table-column>
      <el-table-column
        label="投放日期"
        prop="launch_date" width="100px" align="center">
      </el-table-column>
      <el-table-column
        label="状态"
        prop="settlement_info.status" width="85px" align="center">
        <template slot-scope="scope">

          <el-tag type="danger" v-if="scope.row.status===0">未执行</el-tag>
          <el-tag type="success" v-else-if="scope.row.status===1">执行中</el-tag>
          <el-tag type="success" v-else="scope.row.status===2">已完成</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        label="媒体数据"
        align="center"
        prop="m_"

      >
        <el-table-column
          label="媒体"
          prop="m_full_name" align="center">
          <template slot-scope="scope">
            <span style="color: #409EFF">{{scope.row.m_full_name}} </span>

          </template>
        </el-table-column>
        <el-table-column v-for=" col in  m_columns" :prop="col.prop" :label="col.label" align="center"
                         :key="col.prop"></el-table-column>
      </el-table-column>

      <el-table-column
        label="广告数据"
        align="center"
        prop="a_"


      >
        <el-table-column
          label="广告"
          prop="a_full_name" align="center"

        >

          <template slot-scope="scope">
            <span style="color: #67C23A">{{scope.row.a_full_name}} </span>

          </template>
        </el-table-column>
        <el-table-column v-for=" col in  a_columns" :prop="col.prop" :label="col.label" align="center"
                         :key="col.prop" width="85px"></el-table-column>
      </el-table-column>
      <el-table-column
        label="利润(元)"
        prop="settlement_info.profit" width="100">
        <template slot-scope="scope">
          <span :style="(scope.row.settlement_info.profit>0?'':'color:red')">{{scope.row.settlement_info.profit}}</span>
        </template>
      </el-table-column>


    </el-table>

    <!-- 分页 -->
    <el-pagination style='margin-top: 20px'
                   background
                   :page-sizes="[ 20,30, 50,100]"
                   :page-size="requestParams.pageSize"
                   :current-page.sync="requestParams.currentPage"
                   layout="total, sizes, prev, pager, next, jumper"
                   :total="dataTotal"
                   @size-change="sizeChange"
                   @current-change='getPlansData'/>
    <!--/ 分页 -->
  </div>
</template>

<script>

  const m_columnsOptionInit = [
    {
      label: "位置",
      prop: "m_location_text"
    },
    {
      label: "端口",
      prop: "m_port_text"
    },
    {
      label: "计费类型",
      prop: "m_charge_sort_text"
    },
    {
      label: "单价(元)",
      prop: "settlement_info.m_unit_price"
    },

    {
      label: "曝光量",
      prop: "settlement_info.m_exposure_count"
    },
    {
      label: "点击量",
      prop: "settlement_info.m_click_count"
    },
    {
      label: "点击率",
      prop: "settlement_info.m_click_rate"
    },
    {
      label: "结算数",
      prop: "settlement_info.m_settlement_count"
    },
    {
      label: "成本(元)",
      prop: "settlement_info.cost"
    },

  ]

  const a_columnsOptionInit = [
    {
      label: "计费类型",
      prop: "a_charge_sort_text"
    },
    {
      label: "单价(元)",
      prop: "settlement_info.a_unit_price"
    },
    {
      label: "曝光量",
      prop: "settlement_info.a_exposure_count"
    },
    {
      label: "点击量",
      prop: "settlement_info.a_click_count"
    },

    {
      label: "点击率",
      prop: "settlement_info.a_click_rate"
    },

    // {
    //   label: "七日唤醒率",
    //   prop: "settlement_info.a_week_rate"
    // },
    {
      label: "结算数",
      prop: "settlement_info.a_settlement_count"
    },
    {
      label: "收入(元)",
      prop: "settlement_info.income"
    },

  ]

  const m_checkedColumnInit = m_columnsOptionInit.map((item, index, ary) => {
    return item.prop
  })


  const a_checkedColumnInit = a_columnsOptionInit.map((item, index, ary) => {
    return item.prop
  })
  //const a_checkedColumnInit = [];
  const columnsInit = [
    {
      label: "媒体",
      prop: "m_full_name"
    },
    {
      label: "广告",
      prop: "a_full_name"
    },
    {
      label: "利润",
      prop: "settlement_info.profit"
    }

  ]

  export default {
    name: "list",
    data() {
      return {
        loading: false,
        optionsShow: false,
        // actionsShow:false,
        //singleRow: false,
        multipleSelection: [],
        singleRowData: null,
        advertList: [],
        mediaList: [],
        planTable: [],
        summary: {},
        statusList: [
          {
            id: 0,
            title: "未执行"
          },
          {
            id: 1,
            title: "执行中"
          },
          {
            id: 3,
            title: "已完成"
          },
        ],

        dataTotal: 0,
        //查询条件字段
        queryParams: {
          media: null,//代理名称
          advertiser: null,
          status: null,
          launch_date__gte: "",
          launch_date__lte: ""

        },
        dateRange: "",
        //数据请求的参数
        requestParams: {
          pageSize: 20,//分页大小
          currentPage: 1,//当前页
          sortProp: '',
          sortOrder: '',


        },
        m_isIndeterminate: false,
        m_checkAll: true,
        m_checkedColumn: m_checkedColumnInit,
        m_columnsOption: m_columnsOptionInit,

        a_isIndeterminate: false,
        a_checkAll: true,
        a_checkedColumn: a_checkedColumnInit,
        a_columnsOption: a_columnsOptionInit,

      }
    },
    methods: {
      getPlansData() {
        this.loading = true
        this.$service.getPlanList(this.requestParams).then(res => {
          console.log(res)
          if (res.code === 1000) {
            this.loading = false
            this.planTable = res.data.list
            this.dataTotal = res.data.count
            this.summary = res.data.summary
          }
          this.$nextTick(() => {
            this.$refs.tableDataRef.doLayout();
          });
        })
      },
      //分页容量大小发生变化时
      sizeChange(value) {
        this.requestParams.pageSize = value
        this.requestParams.currentPage = 1
        this.getPlansData()
      },
      // 获取所有媒体数据
      getMediaData() {
        this.$service.getAllMedia().then(res => {
          console.log(res.data)
          if (res.code === 1000) {
            this.mediaList = res.data;
          }

        })
      },
      // 获取所有客户
      getAdvertData() {
        this.$service.getAllAdvert().then(res => {

          if (res.code === 1000) {
            this.advertList = res.data
          }
        })
      },
      query() {
        this.requestParams = {
          ...this.requestParams, ...this.queryParams,
          ...{launch_date__gte: this.launch_date__gte, launch_date__lte: this.launch_date__lte}
        }
        this.requestParams.currentPage = 1
        this.getPlansData()
      },
      m_handleCheckAllChange(val) {

        this.m_checkedColumn = val ? m_checkedColumnInit : [];
        this.m_isIndeterminate = false;
      },
      m_handleCheckedColumnChange(value) {
        //console.log("this.checkedColumn", this.m_checkedColumn)
        let checkedCount = value.length;
        this.m_checkAll = checkedCount === this.m_columnsOption.length;
        this.m_isIndeterminate = checkedCount > 0 && checkedCount < this.m_columnsOption.length;

      },

      a_handleCheckAllChange(val) {

        this.a_checkedColumn = val ? a_checkedColumnInit : [];
        this.a_isIndeterminate = false;
      },
      a_handleCheckedColumnChange(value) {
        //console.log("this.checkedColumn", this.m_checkedColumn)
        let checkedCount = value.length;
        this.a_checkAll = checkedCount === this.a_columnsOption.length;
        this.a_isIndeterminate = checkedCount > 0 && checkedCount < this.a_columnsOption.length;

      },
      headerRowStyle({row, column, rowIndex, columnIndex}) {
        //console.log(row, column, rowIndex, columnIndex)
        if (typeof (column.property) == "undefined") {
          return
        }
        // if (column.property.indexOf("m_") !== -1) {
        //
        //   return "background-color:green; color:red;"
        // }

      },
      getSummaries(param) {
        const {columns, data} = param;
        //console.log("columns", columns, data)
        let sumsIntit = ["", "合计", ""]

        for (let i = 0; i < columns.length; i++) {
          if (i <= sumsIntit.length - 1) {
            continue;
          } else {
            //console.log(columns[i].property)
            let summ = this.summary[columns[i].property] ? this.summary[columns[i].property] : ""
            sumsIntit.push(summ)
          }
        }
        //console.log(" sumsIntit", sumsIntit)

        // this.$nextTick(() => {
        //    this.$refs.tableDataRef.doLayout();
        //  });
        return sumsIntit
      },
      handleCurrentChange(val) {

        //this.singleRow = true;

        this.singleRowData = val

        console.log("this.singleRowData", this.singleRowData);
      },
      handleSelectionChange(val) {
        // console.log("状态改变了");
        // console.log(this.actionsShow)
        // this.actionsShow=false;
        // console.log(this.actionsShow)
        this.multipleSelection = val;
        console.log(this.multipleSelection)
        this.$nextTick(() => {
          //取消行的选中状态
          this.$refs.tableDataRef.setCurrentRow();
          //this.singleRowData = null;

          console.log("fasle")
        });
      }
    },
    computed: {
      deleteShow: {

        get() {

          return this.multipleSelection.length > 0

        }
        ,
        set() {

        }
      },
      actionsShow: {
        get() {
          return this.singleRowData != null
        }
      },
      m_columns: {
        get() {
          let tempCols = []
          console.log(this.m_columnsOption, this.m_checkedColumn)
          for (var i = 0; i < this.m_columnsOption.length; i++) {
            for (var j = 0; j < this.m_checkedColumn.length; j++) {
              if (this.m_columnsOption[i].prop === this.m_checkedColumn[j]) {
                tempCols.push(this.m_columnsOption[i]);
              }
            }
          }
          //console.log("tempCols", tempCols)
          this.$nextTick(() => {
            this.$refs.tableDataRef.doLayout();
          });
          return tempCols
        },

      },

      a_columns: {
        get() {
          let tempCols = []
          //console.log(this.a_columnsOption, this.a_checkedColumn)
          for (var i = 0; i < this.a_columnsOption.length; i++) {
            for (var j = 0; j < this.a_checkedColumn.length; j++) {
              if (this.a_columnsOption[i].prop === this.a_checkedColumn[j]) {
                tempCols.push(this.a_columnsOption[i]);
              }
            }
          }
          //console.log("tempCols", tempCols)
          this.$nextTick(() => {
            this.$refs.tableDataRef.doLayout();
          });
          return tempCols
        }
      },
      launch_date__gte: {
        get() {
          if (this.dateRange) {
            return this.dateRange[0]
          } else {
            return ""
          }


        }
      },
      launch_date__lte: {
        get() {
          if (this.dateRange) {
            return this.dateRange[1]
          } else {
            return ""
          }

        }
      }
    },
    mounted() {
      this.getPlansData();
      this.getMediaData();
      this.getAdvertData();
    }
  }
</script>

<style scoped>
  .ad {
    color: red;
  }

  .query .el-form-item {
    margin-bottom: 0px;
  }
</style>
