<template>

  <div>

    <el-card class="box-card" shadow="hover">
      <div slot="header" class="clearfix">
        <span>计划详情</span>
        <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
      </div>
      <el-row class="info-list" :gutter="40">


        <el-col :span="8" class="info-box-container">

          <el-row>
            <h4>基本信息</h4>
          </el-row>
          <el-row class="info-box-content">

            <el-row class="info-item">
              <el-col :span="12">
                <span class="item-name">计划id：</span>
                <span class="item-text">{{planInfo.id}}</span>
              </el-col>
              <el-col :span="12">
                <span class="item-name">投放时期：</span>
                <span class="item-text">{{planInfo.launch_date}}</span>

              </el-col>


            </el-row>
            <el-row class="info-item">
              <el-col :span="12">
                <span class="item-name">备注：</span>
                <span class="item-text">{{planInfo.remark}}</span>
              </el-col>


            </el-row>

          </el-row>


        </el-col>

        <el-col :span="8" class="info-box-container">

          <el-row>
            <h4>媒体信息</h4>
          </el-row>
          <el-row class="info-box-content">

            <el-row class="info-item">
              <el-col :span="12">
                <span class="item-name">媒体：</span>
                <span class="item-text">{{planInfo.m_full_name}}</span>
              </el-col>
              <el-col :span="12">
                <span class="item-name">位置：</span>
                <span class="item-text">{{planInfo.m_location_text}}</span>

              </el-col>


            </el-row>
            <el-row class="info-item">
              <el-col :span="12">
                <span class="item-name">端口：</span>
                <span class="item-text">{{planInfo.m_port_text}}</span>
              </el-col>
              <el-col :span="12">
                <span class="item-name">计费类型：</span>
                <span class="item-text">{{planInfo.m_charge_sort_text}}</span>

              </el-col>


            </el-row>

          </el-row>


        </el-col>
        <el-col :span="8" class="info-box-container">

          <el-row>
            <h4>广告信息</h4>
          </el-row>
          <el-row class="info-box-content">

            <el-row class="info-item">
              <el-col :span="12">
                <span class="item-name">广告：</span>
                <span class="item-text">{{planInfo.a_full_name}}</span>
              </el-col>
              <el-col :span="12">
                <span class="item-name">计费类型：</span>
                <span class="item-text">{{planInfo.a_charge_sort_text}}</span>

              </el-col>


            </el-row>
            <el-row class="info-item">
              <el-col>
                <span class="item-name">链接：</span>
                <span class="item-text">{{planInfo.ad_url}}</span>
              </el-col>


            </el-row>


          </el-row>


        </el-col>
      </el-row>
    </el-card>


    <el-card class="box-card" shadow="hover">
      <div slot="header">
        <span>录入数据</span>
        <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
      </div>
      <el-form ref="form" :model="planInfo.settlement_info" label-width="140px"
      >
        <el-row class="input-data-container">
          <el-col class="input-box" :span="12">
            <el-row class="input-title">
              <el-col :span="2" :offset="11" style="text-align: center">
                <el-badge :value="(m_isCheckout?'已对账':'未对账')" :type="(m_isCheckout?'success':'danger')">
                  <el-tag size="medium" style="font-size: 18px" effect="plain">媒体</el-tag>
                </el-badge>

              </el-col>
            </el-row>
            <el-row class="input-data-box">
              <el-row class="form-item-box">
                <el-col :span="8" :offset="6">
                  <el-form-item label="单价" class="my-form-item">
                    <el-input-number :disabled="m_isCheckout" size="medium"
                                     v-model="planInfo.settlement_info.m_unit_price" :min="0"
                                     controls-position="right"></el-input-number>
                  </el-form-item>
                </el-col>

              </el-row>
              <el-row class="form-item-box">
                <el-col :span="8" :offset="6">
                  <el-form-item label="曝光量" class="my-form-item">
                    <el-input-number :disabled="m_isCheckout" size="medium"
                                     v-model="planInfo.settlement_info.m_exposure_count" :min="0"
                                     controls-position="right"></el-input-number>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row class="form-item-box">

                <el-col :span="8" :offset="6">
                  <el-form-item label="点击数" class="my-form-item">
                    <el-input-number :disabled="m_isCheckout" size="medium"
                                     v-model="planInfo.settlement_info.m_click_count" :min="0"
                                     controls-position="right"></el-input-number>
                  </el-form-item>
                </el-col>
              </el-row>


              <el-row class="form-item-box">
                <el-col :span="8" :offset="6">
                  <el-form-item label="结算数" class="my-form-item">
                    <el-input-number :disabled="m_isCheckout" size="medium"
                                     v-model="planInfo.settlement_info.m_settlement_count" :min="0"
                                     controls-position="right"></el-input-number>
                  </el-form-item>
                </el-col>

              </el-row>
            </el-row>
            <el-row class="form-item-box">
              <el-col :span="8" :offset="7">
                <el-form-item label="点击率（%）" class="my-form-item">
                  <p style="line-height: 36px;font-size: 16px">{{media_click_rate}}</p>
                </el-form-item>
              </el-col>

            </el-row>
            <el-row class="form-item-box">
              <el-col :span="8" :offset="7">
                <el-form-item label="成本（元）" class="my-form-item">
                  <p style="line-height: 36px;font-size: 16px">{{cost}}</p>
                </el-form-item>
              </el-col>

            </el-row>

          </el-col>
          <el-col class="input-box" :span="12">
            <el-row class="input-title">
              <el-col :span="2" :offset="11" style="text-align: center">
                <el-badge :value="(a_isCheckout?'已对账':'未对账')" :type="(a_isCheckout?'success':'danger')">
                  <el-tag size="medium" style="font-size: 18px" effect="plain">广告</el-tag>
                </el-badge>
              </el-col>
            </el-row>
            <el-row class="input-data-box">
              <el-row class="form-item-box">
                <el-col :span="8" :offset="6">
                  <el-form-item label="单价" class="my-form-item">
                    <el-input-number :disabled="a_isCheckout" size="medium"
                                     v-model="planInfo.settlement_info.a_unit_price" :min="0"
                                     controls-position="right"></el-input-number>
                  </el-form-item>
                </el-col>

              </el-row>

              <el-row class="form-item-box">
                <el-col :span="8" :offset="6">
                  <el-form-item label="曝光量" class="my-form-item">
                    <el-input-number :disabled="a_isCheckout" size="medium"
                                     v-model="planInfo.settlement_info.a_exposure_count" :min="0"
                                     controls-position="right"></el-input-number>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row class="form-item-box">

                <el-col :span="8" :offset="6">
                  <el-form-item label="点击数" class="my-form-item">
                    <el-input-number :disabled="a_isCheckout" size="medium"
                                     v-model="planInfo.settlement_info.a_click_count" :min="0"
                                     controls-position="right"></el-input-number>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row class="form-item-box">
                <el-col :span="8" :offset="6">
                  <el-form-item label="七日唤醒率（%）" class="my-form-item">
                    <el-input-number :disabled="a_isCheckout" size="medium"
                                     v-model="planInfo.settlement_info.a_week_rate" :min="0"
                                     controls-position="right"></el-input-number>
                  </el-form-item>
                </el-col>

              </el-row>

              <el-row class="form-item-box">
                <el-col :span="8" :offset="6">
                  <el-form-item label="结算数" class="my-form-item">
                    <el-input-number :disabled="a_isCheckout" size="medium"
                                     v-model="planInfo.settlement_info.a_settlement_count" :min="0"
                                     controls-position="right"></el-input-number>
                  </el-form-item>
                </el-col>

              </el-row>
            </el-row>
            <el-row class="form-item-box">
              <el-col :span="8" :offset="6">
                <el-form-item label="点击率（%）" class="my-form-item">
                  <p style="line-height: 36px;font-size: 16px">{{ad_click_rate}}</p>
                </el-form-item>
              </el-col>

            </el-row>
            <el-row class="form-item-box">
              <el-col :span="8" :offset="6">
                <el-form-item label="收入（元）" class="my-form-item">
                  <p style="line-height: 36px;font-size: 16px">{{income}}</p>
                </el-form-item>
              </el-col>

            </el-row>

          </el-col>
        </el-row>
        <el-row class="profit" type="flex" justify="center">

          <el-form-item label="利润（元）" class="my-form-item" style="margin-top: 18px;width: 250px">
            <p style="line-height: 36px;font-size: 16px">{{profit}}</p>
          </el-form-item>

        </el-row>
        <el-row class="action-box" v-if="planInfo.settlement_info.status===0">
          <el-col :span="6" :offset="9">
            <el-form-item>

              <el-button type="primary" @click="submitForm()">提交</el-button>
              <el-button>重置</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <!--{{planInfo.settlement_info.plan_launch_count}}-->
    <!--<el-form ref="form" :model="planInfo.settlement_info" label-width="100px"-->
    <!--&gt;-->

    <!--<el-row>-->
    <!--<el-divider content-position="center" class="divider"><h1>-->
    <!--ID：{{planInfo.id}}|{{planInfo.settlement_info.m_unit_price}}</h1>-->
    <!--</el-divider>-->
    <!--</el-row>-->
    <!--<el-row>-->
    <!--<el-col :span="4" :offset="10" class="c-form-text">-->
    <!--<el-form-item label="投放日期">-->
    <!--<span>{{planInfo.launch_date}}</span>-->
    <!--</el-form-item>-->
    <!--</el-col>-->
    <!--</el-row>-->
    <!--<el-row type="flex" justify="center">-->
    <!--<el-col :span="10">-->

    <!--<div class="info c-form-text">-->
    <!--<el-row>-->
    <!--<el-divider content-position="left" class="divider"><h1>媒体信息</h1></el-divider>-->
    <!--<el-col :span="8">-->
    <!--<el-form-item label="媒体">-->
    <!--<span>{{planInfo.m_full_name}}</span>-->
    <!--</el-form-item>-->
    <!--</el-col>-->
    <!--</el-row>-->
    <!--<el-row>-->
    <!--<el-col :span="8">-->
    <!--<el-form-item label="位置">-->
    <!--<span>{{planInfo.m_location_text}}</span>-->
    <!--</el-form-item>-->
    <!--</el-col>-->

    <!--<el-col :span="8">-->
    <!--<el-form-item label="端口">-->
    <!--<span>{{planInfo.m_port_text}}</span>-->
    <!--</el-form-item>-->
    <!--</el-col>-->
    <!--<el-col :span="8">-->
    <!--<el-form-item label="计费类型">-->
    <!--<span>{{planInfo.m_charge_sort_text}}</span>-->
    <!--</el-form-item>-->
    <!--</el-col>-->
    <!--</el-row>-->

    <!--</div>-->
    <!--<el-row>-->
    <!--<el-divider content-position="left" class="divider"><h1>录入数据</h1></el-divider>-->
    <!--</el-row>-->

    <!--<el-form-item label="单价(元)">-->

    <!--<el-input-number v-model="planInfo.settlement_info.m_unit_price"-->
    <!--controls-position="right"></el-input-number>-->
    <!--</el-form-item>-->
    <!--&lt;!&ndash;<el-form-item label="曝光量">&ndash;&gt;-->
    <!--&lt;!&ndash;<el-input-number v-model="planInfo.settlement_info.m_exposure_count"&ndash;&gt;-->
    <!--&lt;!&ndash;controls-position="right"></el-input-number>&ndash;&gt;-->

    <!--&lt;!&ndash;</el-form-item>&ndash;&gt;-->
    <!--<el-form-item label="曝光量">-->
    <!--<el-input v-model="planInfo.settlement_info.m_exposure_count"-->
    <!--&gt;</el-input>-->
    <!--</el-form-item>-->
    <!--<el-row>-->
    <!--<el-col :span="8">-->
    <!--<el-form-item label="点击量">-->
    <!--<el-input-number v-model="planInfo.settlement_info.m_click_count" controls-position="right"-->
    <!--:min="0"></el-input-number>-->
    <!--</el-form-item>-->
    <!--</el-col>-->
    <!--<el-col :span="8" class="c-form-text">-->
    <!--<el-form-item label="点击率(%)">-->
    <!--<span>{{media_click_rate}}</span>-->

    <!--</el-form-item>-->

    <!--</el-col>-->
    <!--</el-row>-->
    <!--<el-form-item label="结算数">-->
    <!--<el-input-number v-model="planInfo.settlement_info.m_settlement_count"-->
    <!--controls-position="right"></el-input-number>-->

    <!--</el-form-item>-->
    <!--<div class="c-form-text">-->

    <!--<el-form-item label="成本(元)">-->
    <!--<span>{{cost}}</span>-->
    <!--</el-form-item>-->

    <!--</div>-->
    <!--</el-col>-->

    <!--<el-col :span="10" :offset="2">-->
    <!--<div class="info c-form-text">-->
    <!--<el-row>-->
    <!--<el-divider content-position="center" class="divider"><h1>广告信息</h1></el-divider>-->
    <!--<el-col :span="8">-->
    <!--<el-form-item label="广告">-->
    <!--<span>{{planInfo.a_full_name}}</span>-->
    <!--</el-form-item>-->
    <!--</el-col>-->
    <!--</el-row>-->
    <!--<el-row>-->
    <!--<el-col :span="8">-->
    <!--<el-form-item label="链接">-->
    <!--<span>{{planInfo.ad_url}}</span>-->
    <!--</el-form-item>-->
    <!--</el-col>-->


    <!--</el-row>-->
    <!--<el-row>-->
    <!--<el-col :span="8">-->
    <!--<el-form-item label="计费类型">-->
    <!--<span>{{planInfo.a_charge_sort_text}}</span>-->
    <!--</el-form-item>-->
    <!--</el-col>-->


    <!--</el-row>-->

    <!--</div>-->
    <!--<el-row>-->
    <!--<el-divider content-position="left" class="divider"><h1>录入数据</h1></el-divider>-->
    <!--</el-row>-->
    <!--<el-form-item label="单价(元)">-->

    <!--<el-input-number v-model="planInfo.settlement_info.a_unit_price"-->
    <!--controls-position="right"></el-input-number>-->
    <!--</el-form-item>-->

    <!--<el-form-item label="曝光量">-->
    <!--<el-input v-model="planInfo.settlement_info.a_exposure_count"-->
    <!--&gt;</el-input>-->
    <!--</el-form-item>-->
    <!--<el-row>-->
    <!--<el-col :span="8">-->
    <!--<el-form-item label="点击量">-->
    <!--<el-input-number v-model="planInfo.settlement_info.a_click_count" controls-position="right"-->
    <!--:min="0"></el-input-number>-->
    <!--</el-form-item>-->
    <!--</el-col>-->
    <!--<el-col :span="8" class="c-form-text">-->
    <!--<el-form-item label="点击率(%)">-->
    <!--<span>{{ad_click_rate}}</span>-->

    <!--</el-form-item>-->

    <!--</el-col>-->
    <!--</el-row>-->

    <!--<el-form-item label="七日唤醒率" label-width="100px">-->
    <!--<el-input-number v-model="planInfo.settlement_info.a_week_rate" controls-position="right"-->
    <!--:min="0"></el-input-number>-->
    <!--</el-form-item>-->
    <!--<el-form-item label="结算数">-->
    <!--<el-input-number v-model="planInfo.settlement_info.a_settlement_count"-->
    <!--controls-position="right"></el-input-number>-->

    <!--</el-form-item>-->
    <!--<el-col :span="6" class="c-form-text">-->
    <!--<el-form-item label="收入(元)">-->
    <!--<span>{{income}}</span>-->
    <!--</el-form-item>-->
    <!--</el-col>-->

    <!--</el-col>-->

    <!--</el-row>-->

    <!--<el-row>-->
    <!--<el-divider content-position="center" class="divider"><h1>结算</h1></el-divider>-->
    <!--</el-row>-->

    <!--<el-row :gutter="20">-->
    <!--&lt;!&ndash;<el-col :span="6">&ndash;&gt;-->
    <!--&lt;!&ndash;<el-form-item label="结算数">&ndash;&gt;-->
    <!--&lt;!&ndash;<el-input-number v-model="planInfo.settlement_info.settlement_count" controls-position="right"&ndash;&gt;-->
    <!--&lt;!&ndash;:min="0"></el-input-number>&ndash;&gt;-->
    <!--&lt;!&ndash;</el-form-item>&ndash;&gt;-->
    <!--&lt;!&ndash;</el-col>&ndash;&gt;-->
    <!--<div class="c-form-text">-->
    <!--<el-col :span="6">-->
    <!--<el-form-item label="成本(元)">-->
    <!--<span>{{cost}}</span>-->
    <!--</el-form-item>-->
    <!--</el-col>-->
    <!--<el-col :span="6">-->
    <!--<el-form-item label="收入(元)">-->
    <!--<span>{{income}}</span>-->
    <!--</el-form-item>-->
    <!--</el-col>-->
    <!--<el-col :span="6">-->
    <!--<el-form-item label="利润(元)">-->
    <!--<span>{{profit}}</span>-->
    <!--</el-form-item>-->
    <!--</el-col>-->
    <!--</div>-->
    <!--</el-row>-->
    <!--<el-form-item>-->
    <!--<el-button type="primary" @click="submitForm()">提交</el-button>-->
    <!--<el-button>重置</el-button>-->
    <!--</el-form-item>-->
    <!--</el-form>-->
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
    m_exposure_count: null,
    m_click_count: undefined,
    m_click_rate: null,
    m_statement_status: null,
    a_exposure_count: null,
    a_click_count: null,
    a_click_rate: null,
    a_week_rate: null,
    a_statement_status: null,
    m_settlement_count: null,
    a_settlement_count: null,
    cost: null,
    income: null,
    profit: null,
    status: null,

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
      m_isCheckout: {
        get() {
          return this.planInfo.settlement_info.m_statement_status === 1 ? true : false
        }
      },
      a_isCheckout: {
        get() {
          return this.planInfo.settlement_info.a_statement_status === 1 ? true : false
        }
      }
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

  .info-box-container {
    border-right: 1px solid #EBEEF5;
    min-height: 100px;
  }


  .info-box-container h4 {
    font-weight: bold;
    margin-bottom: 20px;
  }

  .info-list .item-name {
    font-size: 14px;
    color: rgb(153, 153, 153);
  }

  .info-list .info-item {
    margin-bottom: 10px;
  }

  .info-list .item-text {
    font-size: 16px;
    color: #333333
  }

  .box-card {
    margin-bottom: 10px;
  }

  .input-box {
    border-right: 1px solid #EBEEF5;
    min-height: 200px;
  }

  .my-form-item label {
    font-size: 16px;
    margin-top: 4px;
  }

  .input-title {
    margin-bottom: 60px;
    font-size: 20px;
    font-weight: bold;
  }

  .form-item-box {
    margin-bottom: 20px;
  }

  .input-data-box {
    min-height: 380px;
  }

  .profit {
    margin-top: 30px;
    border-top: 1px solid #EBEEF5;
    border-bottom: 1px solid #EBEEF5;
  }

  .action-box {
    margin-top: 18px;
  }
</style>
