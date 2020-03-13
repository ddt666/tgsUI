<template>
  <div>

    <router-view></router-view>



  </div>
</template>

<script>
  export default {
    name: "index",
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

    }
  }
</script>

<style scoped>

</style>
