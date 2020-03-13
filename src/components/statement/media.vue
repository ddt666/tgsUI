<template>
  <div>

    <el-row>
      <el-form inline>

        <el-form-item label="媒体">
          <el-select v-model="requestParams.media" filterable clearable placeholder="请选择媒体">
            <el-option
              v-for="(item,index) in mediaList"
              :key="index"
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


        <el-form-item>
          <el-button type="primary" @click="query">查询</el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <el-card>
      <div slot="header">
        <span>对账区</span>

      </div>
      <el-table
        :data="statementData"
        style="width: 100%;height: 100px"
        stripe


      >
        <el-table-column
          label="媒体"
          prop="media_name">
        </el-table-column>
        <el-table-column
          label="时间区间"
        >
          <template slot-scope="scope">
            <span>{{scope.row.start_time}} 至 {{scope.row.end_time}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="成本（元）"
          prop="cost">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-popconfirm
              title="对账无误？"
              @onConfirm="checkSuccess(scope.row)"
            >
              <el-button type="primary" slot="reference">确认对账</el-button>
            </el-popconfirm>

            <el-button type="primary" @click="exportExcel(scope.row,0)">导出明细</el-button>
            <!--<router-link-->
            <!--target="_blank"-->
            <!--:to="{-->
            <!--name:'MediaStatementDetail',-->
            <!--query: {-->
            <!--media:statementData.media,-->
            <!--advertiser:scope.row.advertiser,-->
            <!--launch_date__gte: statementData.start_date_str ,-->
            <!--launch_date__lte:statementData.end_date_str ,-->
            <!--noPage:1-->
            <!--}-->
            <!--}"-->
            <!--&gt;-->
            <!--<el-link type="primary" :underline="false" >查看</el-link>-->
            <!--</router-link>-->

          </template>
        </el-table-column>
      </el-table>
    </el-card>


    <el-card>
      <div slot="header">
        <span>核对历史</span>

      </div>
      <el-table
        :data="mediaHistoryStatementData"
        style="width: 100%"
        stripe


      >
        <el-table-column
          label="媒体"
          prop="media_name">
        </el-table-column>
        <el-table-column
          label="时间区间"
        >
          <template slot-scope="scope">
            <span>{{scope.row.start_time}} 至 {{scope.row.end_time}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="成本（元）"
          prop="cost">
        </el-table-column>
        <el-table-column
          label="核对时间"
          prop="created">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">


            <el-button type="primary" @click="exportExcel(scope.row,1)">导出明细</el-button>
            <!--<router-link-->
            <!--target="_blank"-->
            <!--:to="{-->
            <!--name:'MediaStatementDetail',-->
            <!--query: {-->
            <!--media:statementData.media,-->
            <!--advertiser:scope.row.advertiser,-->
            <!--launch_date__gte: statementData.start_date_str ,-->
            <!--launch_date__lte:statementData.end_date_str ,-->
            <!--noPage:1-->
            <!--}-->
            <!--}"-->
            <!--&gt;-->
            <!--<el-link type="primary" :underline="false" >查看</el-link>-->
            <!--</router-link>-->

          </template>
        </el-table-column>
      </el-table>
    </el-card>


  </div>
</template>

<script>
  export default {
    name: "Index",
    data() {
      return {
        mediaList: [],
        requestParams: {
          media: null,//代理名称
          launch_date__gte: "",
          launch_date__lte: "",

        },
        dateRange: "",
        statementData: [],
        mediaHistoryStatementData: []

      }
    },
    methods: {
      // 获取所有媒体数据
      getMediaData() {
        this.$service.getAllMedia().then(res => {
          console.log(res.data)
          if (res.code === 1000) {
            this.mediaList = res.data;
          }

        })
      },
      getStatementData() {

        if (this.dateRange) {
          this.requestParams.launch_date__gte = this.dateRange[0]
          this.requestParams.launch_date__lte = this.dateRange[1]
          this.$service.getStatements(this.requestParams).then(res => {
            console.log(res.data)
            if (res.code === 1000) {
              this.statementData = res.data
            }

          })
        }


      },
      getMediaHistoryStatementData() {
        this.$service.getMediaHistoryStatements(this.requestParams).then(res => {
          if (res.code === 1000) {
            this.mediaHistoryStatementData = res.data;
          }
          console.log(res)
        })
      },
      query() {
         if (this.dateRange){
            this.getStatementData();
         }


          this.getMediaHistoryStatementData()


      },

      checkSuccess(row) {
        console.log(row)

        this.$service.checkstatementSuccess(row)
          .then(res => {
            console.log(res)
            if (res.code === 1000) {
              this.mediaHistoryStatementData.unshift(res.data)
              this.statementData = []
            }
          })
      },
      exportExcel(row,statement_status){
        let params={
          media : row.media,
          start_time:row.start_time,
          end_time : row.end_time,
          m_statement_status : statement_status
        }
        this.$service.exportExcel(params).then(

        )
      }

    },
    computed: {},
    mounted() {
      this.getMediaData();
      this.getMediaHistoryStatementData()
    }
  }
</script>

<style scoped>

</style>
