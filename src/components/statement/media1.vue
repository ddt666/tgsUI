<template>
  <div>

    <statement target="media" title="媒体" :selectItem="selectItem"  @query="query">
      <template slot="checkArea">
       <el-table
        :data="checkData"
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
      </template>
    </statement>

  </div>

</template>

<script>
  import Statement from "./statement"

  export default {
    name: "media",
    components: {Statement},
    data() {
      return {
        selectItem: [

        ],
        requestParams:{
          media:null
        },
        checkData:[]

      }
    },
    methods:{
       // 获取所有媒体数据
      getMediaItem(){
        this.$service.getAllMedia().then(res => {
          console.log(res.data)
          if (res.code === 1000) {
            this.selectItem = res.data;
          }

        })
      },
        getStatementData(requestParams) {


          this.$service.getStatements(requestParams).then(res => {
            console.log(res.data)
            if (res.code === 1000) {
              this.checkData = res.data
            }

          })



      },
      getMediaHistoryStatementData() {
        this.$service.getMediaHistoryStatements(this.requestParams).then(res => {
          if (res.code === 1000) {
            this.mediaHistoryStatementData = res.data;
          }
          console.log(res)
        })
      },
      query(requestParams){

        if (requestParams.launch_date__gte)
        {
          this.requestParams={...{media:requestParams.itemId},...requestParams};
          //console.log("this.requestParams",this.requestParams)
          delete  this.requestParams.itemId;
          //this.requestParams={...requestParams}
          //console.log("this.requestParams",this.requestParams)
          this.getStatementData(this.requestParams);
        }
        //console.log(isGetStatement)
        // if (isGetStatement){
        //    this.getStatementData(requestParams);
        // }
          //this.getMediaHistoryStatementData()
      },
    },
     mounted() {
      this.getMediaItem();

    }
  }
</script>

<style scoped>

</style>
