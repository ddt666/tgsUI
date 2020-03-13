<template>

  <div>
    {{planInfo.settlement_info.plan_launch_count}}
    <el-form ref="form" :model="planInfo.settlement_info" label-width="100px"
    >

      <el-row>
        <el-divider content-position="center" class="divider"><h1>
          ID：{{planInfo.id}}|{{planInfo.settlement_info.m_unit_price}}</h1>
        </el-divider>
      </el-row>
      <el-row>
        <el-col :span="4" :offset="10" class="c-form-text">
          <el-form-item label="投放日期">
            <span>{{planInfo.launch_date}}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="10">

          <div class="info c-form-text">
            <el-row>
              <el-divider content-position="left" class="divider"><h1>媒体信息</h1></el-divider>
              <el-col :span="8">
                <el-form-item label="媒体">
                  <span>{{planInfo.m_full_name}}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="位置">
                  <span>{{planInfo.m_location_text}}</span>
                </el-form-item>
              </el-col>

              <el-col :span="8">
                <el-form-item label="端口">
                  <span>{{planInfo.m_port_text}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="计费类型">
                  <span>{{planInfo.m_charge_sort_text}}</span>
                </el-form-item>
              </el-col>
            </el-row>

          </div>
          <el-row>
            <el-divider content-position="left" class="divider"><h1>录入数据</h1></el-divider>
          </el-row>

          <el-form-item label="单价(元)">

            <el-input-number v-model="planInfo.settlement_info.m_unit_price"
                             controls-position="right"></el-input-number>
          </el-form-item>
          <el-form-item label="曝光量">
            <el-input-number v-model="planInfo.settlement_info.m_exposure_count"
                             controls-position="right"></el-input-number>

          </el-form-item>
          <el-row>
            <el-col :span="8">
              <el-form-item label="点击量">
                <el-input-number v-model="planInfo.settlement_info.m_click_count" controls-position="right"
                                 :min="0"></el-input-number>
              </el-form-item>
            </el-col>
            <el-col :span="8" class="c-form-text">
              <el-form-item label="点击率(%)">
                <span>{{media_click_rate}}</span>

              </el-form-item>

            </el-col>
          </el-row>
          <el-form-item label="结算数">
            <el-input-number v-model="planInfo.settlement_info.m_settlement_count"
                             controls-position="right"></el-input-number>

          </el-form-item>
          <div class="c-form-text">

            <el-form-item label="成本(元)">
              <span>{{cost}}</span>
            </el-form-item>

          </div>
        </el-col>

        <el-col :span="10" :offset="2">
          <div class="info c-form-text">
            <el-row>
              <el-divider content-position="center" class="divider"><h1>广告信息</h1></el-divider>
              <el-col :span="8">
                <el-form-item label="广告">
                  <span>{{planInfo.a_full_name}}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="链接">
                  <span>{{planInfo.ad_url}}</span>
                </el-form-item>
              </el-col>


            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="计费类型">
                  <span>{{planInfo.a_charge_sort_text}}</span>
                </el-form-item>
              </el-col>


            </el-row>

          </div>
          <el-row>
            <el-divider content-position="left" class="divider"><h1>录入数据</h1></el-divider>
          </el-row>
          <el-form-item label="单价(元)">

            <el-input-number v-model="planInfo.settlement_info.a_unit_price"
                             controls-position="right"></el-input-number>
          </el-form-item>

          <el-form-item label="曝光量">
            <el-input-number v-model="planInfo.settlement_info.a_exposure_count" controls-position="right"
                             :min="0"></el-input-number>
          </el-form-item>
          <el-row>
            <el-col :span="8">
              <el-form-item label="点击量">
                <el-input-number v-model="planInfo.settlement_info.a_click_count" controls-position="right"
                                 :min="0"></el-input-number>
              </el-form-item>
            </el-col>
            <el-col :span="8" class="c-form-text">
              <el-form-item label="点击率(%)">
                <span>{{ad_click_rate}}</span>

              </el-form-item>

            </el-col>
          </el-row>

          <el-form-item label="七日唤醒率" label-width="100px">
            <el-input-number v-model="planInfo.settlement_info.a_week_rate" controls-position="right"
                             :min="0"></el-input-number>
          </el-form-item>
          <el-form-item label="结算数">
            <el-input-number v-model="planInfo.settlement_info.a_settlement_count"
                             controls-position="right"></el-input-number>

          </el-form-item>
          <el-col :span="6" class="c-form-text">
            <el-form-item label="收入(元)">
              <span>{{income}}</span>
            </el-form-item>
          </el-col>

        </el-col>

      </el-row>

      <el-row>
        <el-divider content-position="center" class="divider"><h1>结算</h1></el-divider>
      </el-row>

      <el-row :gutter="20">
        <!--<el-col :span="6">-->
        <!--<el-form-item label="结算数">-->
        <!--<el-input-number v-model="planInfo.settlement_info.settlement_count" controls-position="right"-->
        <!--:min="0"></el-input-number>-->
        <!--</el-form-item>-->
        <!--</el-col>-->
        <div class="c-form-text">
          <el-col :span="6">
            <el-form-item label="成本(元)">
              <span>{{cost}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="收入(元)">
              <span>{{income}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="利润(元)">
              <span>{{profit}}</span>
            </el-form-item>
          </el-col>
        </div>
      </el-row>
      <el-form-item>
        <el-button type="primary" @click="submitForm()">提交</el-button>
        <el-button>重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import commonJs from '@/utils/common.js'

  const mediaDataInit = {
    exposure_count: "",
    click_count: null,

  }

  const adDataInit = {
    exposure_count: null,
    click_count: null,
    week_rate: null
  }
  const settlementInit = {
    id: null,
    m_unit_price_status: 0,
    m_unit_price: "",
    a_unit_price_status: 0,
    a_unit_price: null,
    plan_launch_count: null,
    budget: null,
    m_exposure_count: "",
    m_click_count: null,
    m_click_rate: null,
    a_exposure_count: null,
    a_click_count: null,
    a_click_rate: null,
    a_week_rate: null,
    m_settlement_count: null,
    a_settlement_count: null,
    cost: null,
    income: null,
    profit: null,

    plan: null


  }
  export default {
    name: "Settlement",
    data() {
      return {
        form: {},
        settlementForm: {...settlementInit},
        num: 1,
        planInfo: {
          settlement_info: {...settlementInit}
        }
      }
    },
    methods: {
      getPlanData() {
        this.$service.getPlanObj(this.plan_id).then(res => {
          if (res.code === 1000) {
            this.planInfo = {...res.data};
            this.planInfo = res.data;
            console.log(res)
            console.log('m_unit_price ', this.planInfo.settlement_info.m_unit_price)
          }

        })
      },
      submitForm() {
        this.$service.editSettlement(this.planInfo.settlement_info).then(res => {

          if (res.code === 1000) {
            this.$message.success(res.msg)
            this.$router.push({name: "PlanList"})
          }
          console.log(res)
        })

      }

    }
    ,
    computed: {
      plan_id: {
        get() {
          return this.$route.params.plan_id
        }
        ,
      },
      //媒体点击率
      media_click_rate: {

        get() {
          let rate = commonJs.getPercent(this.planInfo.settlement_info.m_click_count, this.planInfo.settlement_info.m_exposure_count, false)
          console.log(rate)
          return rate
        }
      },
      //客户点击率
      ad_click_rate: {

        get() {
          let rate = commonJs.getPercent(this.planInfo.settlement_info.a_click_count, this.planInfo.settlement_info.a_exposure_count, false)
          console.log(rate)
          return rate
        }
      },
      //媒体成本
      cost: {
        get() {
          return commonJs.round(this.planInfo.settlement_info.m_settlement_count * this.planInfo.settlement_info.m_unit_price, 3)
        }

      },
      //广告收入
      income: {
        get() {
          return commonJs.round(this.planInfo.settlement_info.a_settlement_count * this.planInfo.settlement_info.a_unit_price)
        }

      },
      //利润
      profit: {
        get() {
          return commonJs.round(this.income - this.cost, 3)
        }

      },
    }
    ,
    mounted() {
      this.getPlanData();
    }
  }
</script>

<style>
  .divider {
    margin-bottom: 40px;
  }

  .info {
    min-height: 250px;
  }

  .c-form-text .el-form-item .el-form-item__content {
    border-bottom: 1px solid #e4e7ed;
  }


</style>
