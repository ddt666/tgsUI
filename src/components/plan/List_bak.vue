<template>
  <div>


    <el-row type="flex" justify="start" style="margin-bottom: 10px">
      <router-link :to="{name:'NewPlan'}">
        <el-button type="primary">新建计划</el-button>
      </router-link>
    </el-row>
    <el-row class="filter-row" type="flex" justify="start">
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
    <el-table
      :data="planTable"
      style="width: 100%"
      stripe


    >
      <el-table-column
        type="selection"
        width="40">
      </el-table-column>

      <el-table-column
        label="ID"
        prop="id">
      </el-table-column>
      <el-table-column
        label="投放日期"
        prop="launch_date" width="85px">
      </el-table-column>
      <el-table-column
        label="状态"
        prop="settlement_info.status">
        <template slot-scope="scope">

          <el-tag type="danger" v-show="scope.row.status===0">未执行</el-tag>
          <el-tag type="success" v-show="scope.row.status===1">执行中</el-tag>
          <el-tag type="success" v-show="scope.row.status===2">已完成</el-tag>
        </template>
      </el-table-column>

      <el-table-column
        label="媒体"
        align="center"
      >
        <el-table-column
          label="媒体名称"
          prop="m_full_name">
        </el-table-column>
        <el-table-column
          label="位置"
          prop="m_location_text">
        </el-table-column>
        <el-table-column
          label="端口"
          prop="m_port_text">
        </el-table-column>
        <el-table-column
          label="计费类型"
          prop="m_charge_sort_text">
        </el-table-column>
        <el-table-column
          label="单价"
          prop="settlement_info.m_unit_price">
        </el-table-column>

        <el-table-column
          label="曝光量"
          prop="settlement_info.m_exposure_count">
        </el-table-column>
        <el-table-column
          label="点击量"
          prop="settlement_info.m_click_count">
        </el-table-column>
        <el-table-column
          label="点击率"
          prop="settlement_info.m_click_rate">
        </el-table-column>
        <el-table-column
          label="结算数"
          prop="settlement_info.m_settlement_count">
        </el-table-column>
        <el-table-column
          label="成本"
          prop="settlement_info.cost">
        </el-table-column>
      </el-table-column>

      <!--广告-->
      <el-table-column
        label="广告" align="center">
        <el-table-column
          label="广告名称"
          prop="a_full_name">
        </el-table-column>

        <el-table-column
          label="计费类型"
          prop="a_charge_sort_text">
        </el-table-column>

        <el-table-column
          label="单价"
          prop="settlement_info.a_unit_price">
        </el-table-column>

        <el-table-column
          label="曝光量"
          prop="settlement_info.a_exposure_count">
        </el-table-column>
        <el-table-column
          label="点击量"
          prop="settlement_info.a_click_count">
        </el-table-column>
        <el-table-column
          label="点击率"
          prop="settlement_info.a_click_rate">
        </el-table-column>
        <el-table-column
          label="七日唤醒率"
          prop="settlement_info.a_week_rate">
        </el-table-column>
        <el-table-column
          label="结算数"
          prop="settlement_info.a_settlement_count">
        </el-table-column>
        <el-table-column
          label="收入"
          prop="settlement_info.income">
        </el-table-column>
      </el-table-column>


      <el-table-column
        label="利润"
        prop="settlement_info.profit" fixed="right">
      </el-table-column>

      <el-table-column label="操作" fixed="right">
        <template slot-scope="scope">
          <router-link
            :to="{name:'PlanSettlement',params:{plan_id:scope.row.id},
             query: { settlement_id: scope.row.settlement_info.id }}"
          >
            <el-link type="primary" :underline="false" v-if="scope.row.settlement_info.status===0">录入数据</el-link>
             <el-link type="primary" :underline="false" v-else="scope.row.settlement_info.status===1">查看数据</el-link>
          </router-link>

        </template>
      </el-table-column>

    </el-table>

    <!-- 分页 -->
    <el-pagination style='margin-top: 10px'
                   background
                   :page-sizes="[10, 20, 30, 40]"
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
  export default {
    name: "list",
    data() {
      return {
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
          pageSize: 10,//分页大小
          currentPage: 1,//当前页
          sortProp: '',
          sortOrder: '',


        },
      }
    },
    methods: {
      getPlansData() {
        this.$service.getPlanList(this.requestParams).then(res => {
          console.log(res)
          if (res.code === 1000) {
            this.planTable = res.data.list
            this.dataTotal = res.data.count
          }
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
      }
    },
    computed: {
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

</style>
