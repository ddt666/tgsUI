<template>
  <div>

    <el-row type="flex" justify="center">
      <el-col :span="16">

        <el-alert style="margin-bottom: 24px"


                  type="success"
                  center


                  :closable="false"
                 >
          <!--<slot name="title">-->
            <!--<span v-html="alertHtml"></span>-->
          <!--</slot>-->
          <template slot="title" ><span v-html="alertHtml"></span></template>
        </el-alert>
        <el-form ref="form" :model="form" label-width="100px" size="medium" class="plan-form">

          <el-form-item label="媒体" style="width: 400px;margin-left: auto;margin-right: auto">
            <el-select v-model="form.media" filterable placeholder="请选择媒体" :disabled="(!!isEdit)">
              <el-option v-for="(m,index) in mediaList" :label="m.full_name" :value="m.id" :key="index"></el-option>
            </el-select>
            <el-button type="primary" icon="el-icon-plus" circle size="mini" @click="createNewMedia"
                       style="margin-left: 20px" v-if="!isEdit"></el-button>
          </el-form-item>


          <!--<el-button type="warning" icon="el-icon-edit" circle size="mini" @click="editMedia"></el-button>-->


          <el-form-item label="位置">
            <el-select v-model="form.m_location" placeholder="请选择位置">
              <el-option v-for="(l,index) in options.location" :label="l.title" :value="l.id"
                         :key="index"></el-option>
            </el-select>
            <el-button type="primary" icon="el-icon-plus" circle size="mini" @click="createLocation"
                       style="margin-left: 20px"></el-button>
          </el-form-item>


          <el-form-item label="端口">
            <el-select v-model="form.m_port" placeholder="请选择端口">
              <el-option v-for="(p,index) in options.port" :label="p.title" :value="p.id" :key="index"></el-option>
            </el-select>
            <el-button type="primary" icon="el-icon-plus" circle size="mini" @click="createPort"
                       style="margin-left: 20px"></el-button>
          </el-form-item>


          <el-form-item label="计费类型">
            <el-select v-model="form.m_charge_sort" placeholder="请选择计费类型">
              <el-option v-for="(s,index) in options.charge_sort" :label="s.title" :value="s.id"
                         :key="index"></el-option>
            </el-select>
            <el-button type="primary" icon="el-icon-plus" circle size="mini" @click="createChargeSort"
                       style="margin-left: 20px"></el-button>
          </el-form-item>


          <el-form-item label="投放日期">


            <el-date-picker
              v-if="isEdit"
              v-model="form.launch_date_str"
              type="date"
              value-format="timestamp"
              placeholder="选择日期">
            </el-date-picker>

            <el-date-picker
              v-else
              v-model="form.launch_date_range"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="timestamp">
            </el-date-picker>
          </el-form-item>


          <el-form-item label="单价(元)">
            <el-input-number v-model="form.settlement_info.m_unit_price" controls-position="right"
                             :min="0"></el-input-number>
          </el-form-item>


          <el-form-item label="预计投放量">
            <el-input-number v-model="form.settlement_info.plan_launch_count" controls-position="right"
                             :min="0"></el-input-number>
          </el-form-item>


          <el-form-item label="预计成本(元)">
            <el-input-number :value="budget" controls-position="right" :min="0" :disabled="true"></el-input-number>
          </el-form-item>

          <el-divider></el-divider>
          <!--下面是广告部分-->

          <el-form-item label="广告">
            <el-select v-model="form.advertiser" placeholder="请选择广告" filterable :disabled="(!!isEdit)">
              <el-option v-for="(a,index) in advertList" :label="a.full_name" :value="a.id" :key="index"></el-option>
            </el-select>
            <el-button type="primary" icon="el-icon-plus" circle size="mini" @click="createAdvert"
                       style="margin-left: 20px" v-if="!isEdit"></el-button>
          </el-form-item>


          <el-form-item label="计费类型">
            <el-select v-model="form.a_charge_sort" placeholder="请选择计费类型">
              <el-option v-for="(s,index) in options.charge_sort" :label="s.title" :value="s.id"
                         :key="index"></el-option>
            </el-select>
            <el-button type="primary" icon="el-icon-plus" circle size="mini" @click="createChargeSort"
                       style="margin-left: 20px"></el-button>
          </el-form-item>


          <el-form-item label="链接" >
            <el-input v-model="form.ad_url" autocomplete="off" style="width: 600px"></el-input>
          </el-form-item>


          <el-form-item label="单价(元)">
            <el-input-number v-model="form.settlement_info.a_unit_price" controls-position="right"
                             :min="0"></el-input-number>
          </el-form-item>
          <el-divider></el-divider>
          <el-form-item label="备注">
            <el-input
              type="textarea"
              :rows="2"
              v-model="form.remark"

            ></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm()">提交</el-button>


            <el-button @click="">取消</el-button>
          </el-form-item>

        </el-form>


      </el-col>
    </el-row>


    <media-dialog ref="editMediaDialog" @update="mediaReload"></media-dialog>
    <advert-dialog ref="editAdvertDialog" @update="advertReload"></advert-dialog>
    <location-dialog ref="editLocationDialog" @update="optionsReload"></location-dialog>
    <port-dialog ref="editPortDialog" @update="optionsReload"></port-dialog>
    <charge-sort-dialog ref="editChargeSortDialog" @update="optionsReload"></charge-sort-dialog>

  </div>
</template>

<script>
  import mediaDialog from './mediaDialog'
  import locationDialog from './locationDialog'
  import portDialog from './portDialog'
  import chargeSortDialog from './chargeSortDialog'
  import advertDialog from './advertDialog'
  //import editMediaDialog from './EditDialog'
  import commonJs from '@/utils/common.js'

  const formInit = {

    id: null,
    // 默认当天
    launch_date: null,
    launch_date_str: commonJs.datetimeToTimestamp(new Date().toLocaleDateString()),
    ad_url: "",
    media: null,
    m_location: null,
    m_port: null,
    m_charge_sort: null,
    advertiser: null,
    a_charge_sort: null,
    remark: null,
    settlement_info: {
      m_unit_price: null,
      plan_launch_count: null,
      a_unit_price: null,

    },
    launch_date_range: [commonJs.datetimeToTimestamp(new Date().toLocaleDateString()), commonJs.datetimeToTimestamp(new Date().toLocaleDateString())]
    //launch_date_range:[]
  }
  export default {
    name: "NewPlan",
    components: {
      mediaDialog,
      locationDialog,
      portDialog,
      chargeSortDialog,
      advertDialog
    },
    data() {
      return {
        options: [],
        mediaList: [],
        advertList: [],
        form: {...formInit},
        editPlanId:null
        // form: {
        //   plan: {
        //     // 默认当天
        //     launch_date: commonJs.datetimeToTimestamp(new Date().toLocaleDateString()),
        //     ad_url: "",
        //     media: null,
        //     m_location: null,
        //     m_port: null,
        //     m_charge_sort: null,
        //     advertiser: null,
        //     a_charge_sort: null,
        //     remark: null
        //   },
        //   settlement: {
        //     m_unit_price: null,
        //     plan_launch_count: null,
        //     a_unit_price: null,
        //
        //   }
        //
        //
        // }
      }
    },
    computed: {
      budget: {


        // getter
        get() {
          return commonJs.round(this.form.settlement_info.m_unit_price * this.form.settlement_info.plan_launch_count, 3)
        }
        ,
        // setter
        set(newValue) {
          //console.log(newValue)
        }
      },
      isEdit: {
        get() {
          if (this.$route.path.indexOf("edit") !== -1) {
            this.editPlanId=this.$route.params.plan_id
            return true
          } else {
            return false
          }

        }
      },
      isCopy: {
        get() {
          if (this.$route.path.indexOf("copy") !== -1) {
            this.editPlanId=this.$route.query.id
            return true
          } else {
            return false
          }

        }
      },
      //  isEdit: {
      //   get() {
      //     if (this.$route.path.indexOf("edit") !== -1) {
      //       this.editPlanId=this.$route.params.plan_id
      //       return true
      //     } else {
      //       return false
      //     }
      //
      //   }
      // },
      // editPlanId: {
      //   get() {
      //     return this.$route.params.plan_id
      //   }
      // },
      // editPlanId: {
      //   get() {
      //     return this.$route.params.plan_id
      //   }
      // },
      alertHtml:{
        get(){
          if(this.isEdit){
            return "<i class='el-icon-edit-outline'></i><span style='margin-left: 8px'>编辑模式</span>"
          }
          else if(this.isCopy){
            return "<i class='el-icon-document-copy'></i><span style='margin-left: 8px'>拷贝模式</span>"
          }
          else {
            return "<i class='el-icon-circle-plus-outline'></i><span style='margin-left: 8px'>新增模式</span>"
          }
        }
      }
    },
    methods: {
      createNewMedia() {
        this.$refs.editMediaDialog.open().then(that => {
          console.log("that", that)
          that.initData()
        })
      },
      //editLocationDialog
      createLocation() {
        this.$refs.editLocationDialog.open().then(that => {

        })
      },
      createPort() {
        this.$refs.editPortDialog.open().then(that => {

        })
      },
      createChargeSort() {
        this.$refs.editChargeSortDialog.open().then(that => {

        })
      },
      createAdvert() {
        this.$refs.editAdvertDialog.open().then(that => {

        })
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
      // 获取所有配置选项
      getOptionData() {
        this.$service.getOptions().then(res => {

          if (res.code === 1000) {
            this.options = res.data
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

      mediaReload() {
        this.getMediaData()
      },
      advertReload() {
        this.getAdvertData()
      },
      optionsReload() {
        this.getOptionData()
      },

      initData() {
        this.getMediaData();
        this.getOptionData();

        this.getAdvertData();

        console.log("状态", this.isEdit)
        if (this.isEdit||this.isCopy) {
          this.$service.getPlanObj(this.editPlanId).then(res => {
            console.log(res)
            if (res.code === 1000) {
              console.log(this.form)
              this.form = ({...res.data, ...{launch_date_range: [res.data.launch_date_str, res.data.launch_date_str]}})
              console.log(this.form)
              // this.form.launch_date_range[0]=res.data.launch_date_str
              // this.form.launch_date_range[1]=res.data.launch_date_str


            }
          })
        } else {

        }
      },

      //上传数据
      submitForm() {
        console.log(this.form)
        if (this.isEdit) {
          this.$service.editPlan(this.form).then(res => {
            if (res.code === 1000) {
              this.$message.success(res.msg)
              this.$router.push({name: "PlanList"})

            }
          })
        } else {
          this.$service.batchCreatPlans(this.form).then(res => {
            if (res.code === 1000) {
              this.$message.success(res.msg)
              this.$router.push({name: "PlanList"})

            }

          })
        }
      }
    },

    mounted() {

      this.initData()
    }
  }
</script>

<style scoped>
.plan-form .el-form-item{
  width: 400px;margin-left: auto;margin-right: auto
}
</style>
