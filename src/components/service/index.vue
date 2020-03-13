<template>
  <div>
    <h1>投放页面</h1>
    <!--<template slot-scope="scope">-->

    <!--&lt;!&ndash;<span style="margin-left: 10px">{{ scope.row.name }} - {{scope.row.agent}}</span>&ndash;&gt;-->
    <!--<span style="margin-left: 10px"></span>-->
    <!--</template>-->
    <el-table
      :data="serviceTable"
      stripe
      v-loading="loading"
      size="medium"
      style="width: 100%">
      <el-table-column
        fixed
        type="expand"
      >
      </el-table-column>
      <el-table-column
        fixed
        prop="id"
        label="投放ID"
        width="100px"

      >
      </el-table-column>
      <el-table-column
        fixed
        prop="status_text"
        label="状态"
        width="100px"
      >

      </el-table-column>
      <el-table-column
        fixed
        prop="serv_date"
        label="投放日期"
        width="180px"
      >

      </el-table-column>

      <el-table-column

        prop="media_plan.media_text"
        label="媒体"
        width="100px"
      >

      </el-table-column>

      <el-table-column

        prop="media_plan.location_text"
        label="位置"
        width="100px"
      >

      </el-table-column>
      <el-table-column

        prop="media_plan.port_text"
        label="端口"
        width="100px"
      >

      </el-table-column>

      <el-table-column

        prop="media_plan.charge_sort_text"
        label="计费类型"
        width="50px"
      >

      </el-table-column>

      <el-table-column

        prop="media_plan.unit_price"
        label="单价"
        width="50px"
      >

      </el-table-column>
      <el-table-column

        prop="media_plan.media_data.exposure_number"
        label="曝光量"
        width="100px"
      >

      </el-table-column>

      <el-table-column

        prop="media_plan.media_data.click_number"
        label="点击"
        width="100px"
      >

      </el-table-column>
      <el-table-column

        prop="media_plan.media_data.click_rate"
        label="点击率"
        width="100px"
      >

      </el-table-column>
      <el-table-column

        prop="media_plan.media_data.cost"
        label="成本"
        width="150px"
      >

      </el-table-column>
      <el-table-column

        prop="ad_plan.ad_text"
        label="广告"
        width="100px"
      ></el-table-column>

      <el-table-column

        prop="media_plan.charge_sort_text"
        label="计费类型"
        width="50px"
      >

      </el-table-column>

      <el-table-column

        prop="ad_plan.unit_price"
        label="单价"
        width="50px"
      >

      </el-table-column>

      <el-table-column

        prop="ad_plan.ad_data.exposure_number"
        label="曝光"
        width="100px"
      >

      </el-table-column>
      <el-table-column

        prop="ad_plan.ad_data.click_number"
        label="点击"
        width="100px"
      >
      </el-table-column>
      <el-table-column

        prop="ad_plan.ad_data.settlement_num"
        label="结算数"
        width="100px"
      >
      </el-table-column>
      <el-table-column

        prop="ad_plan.ad_data.income"
        label="收入"
        width="150px"
      >

      </el-table-column>

      <el-table-column
        fixed='right'
        prop="profit"
        label="利润"
        width="150px"
      >

      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="200px"
      >
        <el-button type="text" size="small">结算</el-button>
        <template slot-scope="scope">

          <router-link :to="{name:'Settlement',params:{serv_id:scope.row.id}}">
            <el-button type="text" size="small">结算</el-button>
          </router-link>

        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    name: "index",
    data() {
      return {
        loading: false,
        serviceTable: [],

      }
    },
    methods: {
      getData() {
        this.loading = true
        this.$service.getServiceList().then(res => {
          console.log(res)
          this.loading = false
          if (res.code == 1000) {
            this.serviceTable = res.data;
          }
        })

      }
    },
    mounted() {
      this.getData()
    }

  }
</script>

<style scoped>

</style>
