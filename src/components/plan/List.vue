<template>
  <div>


    <el-row type="flex" justify="start" style="margin-bottom: 20px">
      <router-link :to="{name:'NewPlan'}">
        <el-button type="primary">新建计划</el-button>
      </router-link>
    </el-row>
    <el-row class="filter-row" type="flex" justify="center" style="margin-bottom: 20px">
      <el-form inline>

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
        <el-form-item>
          <el-button type="primary" @click="query">查询</el-button>
        </el-form-item>
      </el-form>

    </el-row>


    <el-row :gutter="20" style="margin-bottom: 20px" type="flex" justify="center">
      <el-col :span="10">
        <el-row>
          <el-col :span="2"><span>媒体：</span></el-col>
          <el-col :span="22">
            <div>
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
            </div>
          </el-col>
        </el-row>


      </el-col>
      <el-col :span="10">
        <el-row>
          <el-col :span="2"><span>广告：</span></el-col>
          <el-col :span="22">
            <div>
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
            </div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>

    <!--:header-row-style="{color:'red'}"-->
    <el-table
      :data="planTable"
      highlight-current-row
      style="width: 100%"

      height="700"
      v-loading="loading"
      show-summary
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
        prop="launch_date" width="85px" align="center">
      </el-table-column>
      <el-table-column
        label="状态"
        prop="settlement_info.status" width="85px" align="center">
        <template slot-scope="scope">

          <el-tag type="danger" v-show="scope.row.status===0">未执行</el-tag>
          <el-tag type="success" v-show="scope.row.status===1">执行中</el-tag>
          <el-tag type="success" v-show="scope.row.status===2">已完成</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        label="媒体数据"
        align="center"
        prop="m_"

      >
        <el-table-column
          label="媒体"
          prop="m_full_name" align="center"  >
        </el-table-column>
        <el-table-column v-for=" col in  m_columns" :prop="col.prop" :label="col.label" align="center"
                         :key="col.prop" ></el-table-column>
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
        </el-table-column>
        <el-table-column v-for=" col in  a_columns" :prop="col.prop" :label="col.label" align="center"
                         :key="col.prop" width="85px"></el-table-column>
      </el-table-column>
      <el-table-column
        label="利润(元)"
        prop="settlement_info.profit" fixed="right" align="center" >
        <template slot-scope="scope">
          <span :style="(scope.row.settlement_info.profit>0?'':'color:red')">{{scope.row.settlement_info.profit}}</span>
        </template>
      </el-table-column>


      <el-table-column label="操作" fixed="right" align="center" width="180px">
        <template slot-scope="scope">
          <router-link
            :to="{name:'EditPlan',params:{plan_id:scope.row.id}}"
          >
            <el-link type="primary" :underline="false">编辑</el-link>

          </router-link>
          <el-divider direction="vertical"></el-divider>
          <router-link
            :to="{name:'PlanSettlement',params:{plan_id:scope.row.id},
             query: { settlement_id: scope.row.settlement_info.id }}"
          >
            <!--<el-link type="primary" :underline="false" v-if="scope.row.settlement_info.status===0">录入数据</el-link>-->
            <!--<el-link type="primary" :underline="false" v-else="scope.row.settlement_info.status===1">查看数据</el-link>-->
            <el-link type="primary" :underline="false">数据</el-link>
          </router-link>
          <el-divider direction="vertical"></el-divider>

          <router-link
            :to="{name:'CopyPlan',query:{id:scope.row.id}}"
          >
            <el-link type="primary" :underline="false">拷贝</el-link>
          </router-link>
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
        advertList: [],
        mediaList: [],
        planTable: [],
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
        console.log(row, column, rowIndex, columnIndex)
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
        console.log("columns", columns, data)
        const sums = ["总价", 1, 1, 1, 1, 1, 11, 1, 1]
         // this.$nextTick(() => {
         //    this.$refs.tableDataRef.doLayout();
         //  });
        return sums
      }
    },
    computed: {
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
          console.log("tempCols", tempCols)
           this.$nextTick(() => {
            this.$refs.tableDataRef.doLayout();
          });
          return tempCols
        },

      },

      a_columns: {
        get() {
          let tempCols = []
          console.log(this.a_columnsOption, this.a_checkedColumn)
          for (var i = 0; i < this.a_columnsOption.length; i++) {
            for (var j = 0; j < this.a_checkedColumn.length; j++) {
              if (this.a_columnsOption[i].prop === this.a_checkedColumn[j]) {
                tempCols.push(this.a_columnsOption[i]);
              }
            }
          }
          console.log("tempCols", tempCols)
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
</style>
