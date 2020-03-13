<template>
  <div>
    <h1>详细</h1>
    <el-table
      :data="planTable"
      style="width: 100%"
      stripe
      :summary-method="getSummaries"
      show-summary
    >


      <el-table-column
        label="投放日期"
        prop="launch_date" width="85px">
      </el-table-column>
      <!--<el-table-column-->
      <!--label="状态"-->
      <!--prop="settlement_info.status">-->
      <!--<template slot-scope="scope">-->

      <!--<el-tag type="danger" v-show="scope.row.settlement_info.status===0">未执行</el-tag>-->
      <!--<el-tag type="success" v-show="scope.row.status===1">执行中</el-tag>-->
      <!--<el-tag type="success" v-show="scope.row.status===2">已完成</el-tag>-->
      <!--</template>-->
      <!--</el-table-column>-->

      <!--<el-table-column-->
      <!--label="媒体"-->
      <!--align="center"-->
      <!--&gt;-->


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
      <!--</el-table-column>-->

      <!--广告-->
      <!--<el-table-column-->
      <!--label="广告" align="center">-->
      <!--<el-table-column-->
      <!--label="广告名称"-->
      <!--prop="a_full_name">-->
      <!--</el-table-column>-->


      <!--</el-table-column>-->


    </el-table>
  </div>
</template>

<script>
  export default {
    name: "Detail",
    data() {
      return {
        planTable: []
      }
    },
    methods: {
      getPlanData() {
        this.$service.getPlanList(this.$route.query).then(res => {
          console.log(res)
          this.planTable = res.data.list
        })
      },
      getSummaries(param) {
        console.log("param", param)
        const {columns, data} = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '总价';
            return;
          }

          if(column.property!=="settlement_info.cost")
          {
            return;
          }
          console.log("column.property", column.property)
          const values = data.map(item => {
              console.log("item[column.property]", item[column.property])
              let v = "";
              if (typeof (item[column.property]) === "undefined") {

                console.log("空置",item,column.property)
                v = item[column.property.split(".")[0]][column.property.split(".")[1]]

              } else {
                v = item[column.property]
              }
               return Number(v)
            }
          );

          console.log("values", values)
          console.log("column.property", column.property.split(".")[0])
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
            sums[index] += ' 元';
          } else {
            sums[index] = 'N/A';
          }
        });
        return sums;
      }
    },
    mounted() {
      this.getPlanData()
    }
  }
</script>

<style scoped>

</style>
