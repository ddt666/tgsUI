<template>
  <div>
    <h1>结算页面{{service_status}}</h1>


    <el-row type="flex" class="row-bg" justify="start">
      <el-col :span="8">
        <el-card class="box-card card" style="width: 600px;height: 500px">
          <div slot="header" class="clearfix header">
            <span>媒体信息</span>

          </div>
          <ul class="plan-info">

            <li><p class="info-des"><span>媒体</span></p>
              <p><span class="title">{{mediaPlanInfo.media_text}}</span></p></li>
            <li><p class="info-des"><span>位置</span></p>
              <p><span class="title">{{mediaPlanInfo.location_text}}</span></p></li>
            <li><p class="info-des"><span>端口</span></p>
              <p><span class="title">{{mediaPlanInfo.port_text}}</span></p></li>
            <li><p class="info-des"><span>计费类型</span></p>
              <p><span class="title">{{mediaPlanInfo.charge_sort_text}}</span></p></li>
            <li><p class="info-des"><span>单价</span></p>
              <p><span class="title">{{mediaPlanInfo.unit_price}}</span></p></li>
            <li><p class="info-des"><span>目标数量</span></p>
              <p><span class="title">{{mediaPlanInfo.target_number}}</span></p></li>
            <template v-if="media_status">

              <li><p class="info-des"><span>曝光量</span></p>
                <p><span class="title">{{mediaPlanInfo.media_data.exposure_number}}</span></p></li>
              <li><p class="info-des"><span>点击数</span></p>
                <p><span class="title">{{mediaPlanInfo.media_data.click_number}}</span></p></li>
              <li><p class="info-des"><span>点击率</span></p>
                <p><span class="title">{{parseFloat(mediaPlanInfo.media_data.click_rate*100).toFixed(2)}}%</span></p>
              </li>
              <li><p class="info-des"><span>结算数</span></p>
                <p><span class="title">{{mediaPlanInfo.media_data.settlement_num}}</span></p></li>

              <li><p class="info-des"><span>成本</span></p>
                <p><span class="title">{{mediaPlanInfo.media_data.cost}}元</span></p></li>

            </template>

          </ul>
          <template v-if="!media_status">


            <el-divider></el-divider>

            <el-form label-position="right" label-width="60px" :model="mediaPlanInfo.media_data" size="mini">

              <el-row :gutter="6">

                <el-col :span="8">
                  <el-form-item label="曝光量">
                    <el-input v-model="mediaPlanInfo.media_data.exposure_number"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="点击数">
                    <el-input v-model="mediaPlanInfo.media_data.click_number"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="点击率">
                    <el-input v-model="media_click_rate" :disabled="true">
                      <template slot="append">%</template>
                    </el-input>

                  </el-form-item>
                </el-col>
              </el-row>

              <el-row :gutter="6">
                <el-col :span="8">
                  <el-form-item label="结算数">
                    <el-input v-model="mediaPlanInfo.media_data.settlement_num"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="单价:">
                    <span>{{mediaPlanInfo.unit_price}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item label="成本">
                    <el-input v-model="media_cost" :disabled="true">
                      <template slot="append">元</template>
                    </el-input>
                  </el-form-item>
                </el-col>

              </el-row>

              <el-form-item>
                <el-button type="primary" @click="submitMediaForm()">提交</el-button>
                <el-button @click="resetForm('numberValidateForm')">重置</el-button>
              </el-form-item>
            </el-form>
          </template>
        </el-card>
      </el-col>
      <el-col :span="2">
        <div class="grid-content bg-purple-light"></div>
      </el-col>
      <el-col :span="8">
        <el-card class="box-card card" style="width: 600px;height: 500px">
          <div slot="header" class="clearfix header">
            <span>广告信息</span>

          </div>
          <ul class="plan-info">

            <li><p class="info-des"><span>广告</span></p>
              <p><span class="title">{{adPlanInfo.ad_text}}</span></p></li>
            <li><p class="info-des"><span>计费类型</span></p>
              <p><span class="title">{{adPlanInfo.charge_sort_text}}</span></p></li>

            <li><p class="info-des"><span>单价</span></p>
              <p><span class="title">{{adPlanInfo.unit_price}}</span></p></li>

            <template v-if="ad_status">

              <li><p class="info-des"><span>曝光量</span></p>
                <p><span class="title">{{adPlanInfo.ad_data.exposure_number}}</span></p></li>
              <li><p class="info-des"><span>点击数</span></p>
                <p><span class="title">{{adPlanInfo.ad_data.click_number}}</span></p></li>

              <li><p class="info-des"><span>结算数</span></p>
                <p><span class="title">{{adPlanInfo.ad_data.settlement_num}}</span></p></li>

              <li><p class="info-des"><span>收入</span></p>
                <p><span class="title">{{adPlanInfo.ad_data.income}}元</span></p></li>

            </template>

          </ul>
          <template v-if="!ad_status">


            <el-divider></el-divider>

            <el-form label-position="right" label-width="60px" :model="adPlanInfo.ad_data" size="mini">

              <el-row :gutter="6">

                <el-col :span="8">
                  <el-form-item label="曝光量">
                    <el-input v-model="adPlanInfo.ad_data.exposure_number"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="点击数">
                    <el-input v-model="adPlanInfo.ad_data.click_number"></el-input>
                  </el-form-item>
                </el-col>

              </el-row>

              <el-row :gutter="6">
                <el-col :span="8">
                  <el-form-item label="结算数">
                    <el-input v-model="adPlanInfo.ad_data.settlement_num"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="单价:">
                    <span>{{adPlanInfo.unit_price}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item label="收入">
                    <el-input v-model="ad_income" :disabled="true">
                      <template slot="append">元</template>
                    </el-input>
                  </el-form-item>
                </el-col>

              </el-row>

              <el-form-item>
                <el-button type="primary" @click="submitAdForm()">提交</el-button>
                <el-button @click="resetForm('numberValidateForm')">重置</el-button>
              </el-form-item>
            </el-form>
          </template>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  //const mediaInfolist = ["媒体","位置","端口","计价类型","单价","目标数量"]

  import common from '@/utils/common.js'


  const mediaDataInit = {
    id: null,
    exposure_number: null,
    click_number: null,
    click_rate: null,
    cost: null,
    media_plan: null,
    settlement_num: null,
    serv_id:null

  }
  const adDataInit = {
    id: null,
    exposure_number: null,
    click_number: null,
    settlement_num: null,
    click_rate: null,
    income: null,

    ad_plan: null

  }
  const mediaPlaninfoInit = {
    id: null,
    media_text: "",
    location_text: "",
    charge_sort_text: "",
    port_text: "",
    media_data: {...mediaDataInit},
    img_file: null,
    port: null,
    target_number: null,
    unit_price: null,
    media: null,
    location: null,
    charge_sort: null,
    status: 0
  }
  const adPlaninfoInit = {
    id: null,
    ad_text: "",
    charge_sort_text: "",
    ad_data: {...adDataInit},
    unit_price: null,
    status: 0,
    ad: null,
    charge_sort: null
  }
  const serviceInfoInit = {
    id: null,
    status_text: "",
    serv_date: null,
    status: 0,
    profit: null,
    settlement_time: "",
    created:""
  }
  export default {
    name: "settlement",
    data() {
      return {

        mediaPlanInfo: {...mediaPlaninfoInit},
        adPlanInfo: {...adPlaninfoInit},
        serviceInfo: {...serviceInfoInit}
        //mediaData: {...mediaDataInit}
      }
    },
    methods: {
      getData() {
        this.$service.getAdServiceObj(this.$route.params.serv_id)
          .then(res => {

              if (res.code === 1000) {
                this.serviceInfo = common.obj.copyByKey(res.data, [
                  'id',
                  'status_text',
                  'serv_date',
                  'status',
                  'profit',
                  'settlement_time',
                  'created'
                ])
                this.mediaPlanInfo = {...res.data.media_plan}


                console.log(this.mediaPlanInfo)
                console.log(this.mediaPlanInfo.media_data)
                if (this.mediaPlanInfo.media_data === null) {
                  this.mediaPlanInfo.media_data = {...mediaDataInit, ...{media_plan: this.mediaPlanInfo.id},

                  ...{serv_id:res.data.id}
                  }

                }
                this.adPlanInfo = {...res.data.ad_plan}
                if (this.adPlanInfo.ad_data === null) {
                  this.adPlanInfo.ad_data = {...adDataInit, ...{ad_plan: this.adPlanInfo.id}}

                }

                if (res.data.status === 0 && this.service_status === true) {

                }


              }

            }
          )
      },

      // updateService() {
      //   if (this.)
      //
      //     },

      submitMediaForm() {
        this.$service.CreateMediaData(this.mediaPlanInfo.media_data).then(
          res => {
            if (res.code === 1000) {
              this.$message("数据提交成功")
              //this.mediaPlanInfo.media_data={...res.data}
              //this.mediaPlanInfo.status=1
              this.getData()
            } else {
              this.$message(JSON.stringify(res.msg))
            }
            console.log(res)
          }
        )
      },

      submitAdForm() {
        this.$service.CreateAdData(this.adPlanInfo.ad_data).then(
          res => {
            if (res.code === 1000) {
              this.$message({
                message: "数据提交成功",
                type: "success"
              })
              //this.mediaPlanInfo.media_data={...res.data}
              //this.mediaPlanInfo.status=1
              this.getData()
            } else {
              this.$message(JSON.stringify(res.msg))
            }
            console.log(res)
          }
        )

      }


    },
    computed: {


      //媒体点击率
      media_click_rate() {

        let rate = common.getPercent(this.mediaPlanInfo.media_data.click_number, this.mediaPlanInfo.media_data.exposure_number, false)
        console.log(rate)
        return rate
      },

      //媒体成本
      media_cost() {
        return this.mediaPlanInfo.media_data.settlement_num * this.mediaPlanInfo.unit_price
      },
      ad_income() {
        return this.adPlanInfo.ad_data.settlement_num * this.adPlanInfo.unit_price
      },
      media_status() {
        return this.mediaPlanInfo.status === null || this.mediaPlanInfo.status === 0 ? false : true
      },
      ad_status() {
        return this.adPlanInfo.status === null || this.adPlanInfo.status === 0 ? false : true
      },
      service_status() {
        return this.media_status && this.ad_status
      }
    },
    mounted() {
      this.getData()
    }
  }
</script>

<style scoped>
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 480px;
  }

  .header {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .plan-info {
    min-height: 180px;
  }

  .plan-info li {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }

  .plan-info li p {
    width: 50%;
    font-size: 14px;
  }

  .plan-info p.info-des {
    text-align: right;
    color: #99a9bf;
  }

  .plan-info p.info-des span {
    margin-right: 20px;
  }

  .plan-info p.title span {
    margin-left: 20px;
  }


</style>
