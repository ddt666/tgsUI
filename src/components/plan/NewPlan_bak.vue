<template>
  <div>
    <h6>新建计划</h6>

    <el-form ref="form" :model="form" label-width="100px">
      <el-row :gutter="20" type="flex">
        <el-col :span="4">
          <el-form-item label="媒体">
            <el-select v-model="form.plan.media"  filterable placeholder="请选择媒体">
              <el-option v-for="(m,index) in mediaList" :label="m.full_name" :value="m.id" :key="index"></el-option>
            </el-select>
          </el-form-item>

        </el-col>
        <el-col :span="4">
          <el-link type="primary" icon="el-icon-plus" :underline="false" style="margin-top: 6px"
                   @click="createNewMedia">new
          </el-link>

        </el-col>
      </el-row>

      <el-row :gutter="20" type="flex">
        <el-col :span="4">
          <el-form-item label="位置">
            <el-select v-model="form.plan.m_location" placeholder="请选择位置">
              <el-option v-for="(l,index) in options.location" :label="l.title" :value="l.id" :key="index"></el-option>
            </el-select>
          </el-form-item>

        </el-col>
        <el-col :span="4">
          <el-link type="primary" icon="el-icon-plus" :underline="false" style="margin-top: 6px"
                   @click="createNewMedia">new
          </el-link>

        </el-col>
      </el-row>

      <el-row :gutter="20" type="flex">
        <el-col :span="4">
          <el-form-item label="端口">
            <el-select v-model="form.plan.m_port" placeholder="请选择端口">
              <el-option v-for="(p,index) in options.port" :label="p.title" :value="p.id" :key="index"></el-option>
            </el-select>
          </el-form-item>

        </el-col>
        <el-col :span="4">
          <el-link type="primary" icon="el-icon-plus" :underline="false" style="margin-top: 6px"
                   @click="createNewMedia">new
          </el-link>

        </el-col>
      </el-row>

      <el-row :gutter="20" type="flex">
        <el-col :span="4">
          <el-form-item label="计费类型">
            <el-select v-model="form.plan.m_charge_sort" placeholder="请选择计费类型">
              <el-option v-for="(s,index) in options.charge_sort" :label="s.title" :value="s.id"
                         :key="index"></el-option>
            </el-select>
          </el-form-item>

        </el-col>
        <el-col :span="4">
          <el-link type="primary" icon="el-icon-plus" :underline="false" style="margin-top: 6px"
                   @click="createNewMedia">new
          </el-link>

        </el-col>


      </el-row>

      <el-row>
        <el-col>
          <el-form-item label="投放日期">
            <el-date-picker
              v-model="form.plan.launch_date"
              type="date"
              value-format="timestamp"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col>
          <el-form-item label="单价(元)">
            <el-input-number v-model="form.settlement.m_unit_price" controls-position="right"
                             :min="0"></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col>
          <el-form-item label="预计投放量">
            <el-input-number v-model="form.settlement.plan_launch_count" controls-position="right" :min="0"></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col>
          <el-form-item label="预计成本(元)">
            <el-input-number :value="budget" controls-position="right" :min="0" :disabled="true"></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>
      <el-divider></el-divider>
      <!--下面是广告部分-->
      <el-row :gutter="20" type="flex">
        <el-col :span="4">
          <el-form-item label="广告">
            <el-select v-model="form.plan.advertiser" placeholder="请选择广告">
              <el-option v-for="(a,index) in advertList" :label="a.full_name" :value="a.id" :key="index"></el-option>
            </el-select>
          </el-form-item>

        </el-col>
        <el-col :span="4">
          <el-link type="primary" icon="el-icon-plus" :underline="false" style="margin-top: 6px"
                   @click="createNewMedia">new
          </el-link>

        </el-col>
      </el-row>
      <el-row :gutter="20" type="flex">
        <el-col :span="4">
          <el-form-item label="计费类型">
            <el-select v-model="form.plan.a_charge_sort" placeholder="请选择计费类型">
              <el-option v-for="(s,index) in options.charge_sort" :label="s.title" :value="s.id"
                         :key="index"></el-option>
            </el-select>
          </el-form-item>

        </el-col>
        <el-col :span="4">
          <el-link type="primary" icon="el-icon-plus" :underline="false" style="margin-top: 6px"
                   @click="createNewMedia">new
          </el-link>

        </el-col>


      </el-row>

      <el-row>
        <el-col :span="10">
          <el-form-item label="链接">
            <el-input v-model="form.plan.ad_url" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col>
          <el-form-item label="单价(元)">
            <el-input-number v-model="form.settlement.a_unit_price" controls-position="right"
                             :min="0"></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row type="flex" justify="center">
        <el-col :span="2">
          <el-button type="primary" @click="submitForm()">提交</el-button>

        </el-col>

        <el-col :span="2">

          <el-button @click="">取消</el-button>
        </el-col>
      </el-row>
    </el-form>


    <edit-media-dialog ref="editMediaDialog"></edit-media-dialog>

  </div>
</template>

<script>
  import editMediaDialog from './media/EditDialog'
  import commonJs from '@/utils/common.js'

  export default {
    name: "NewPlan",
    components: {
      editMediaDialog
    },
    data() {
      return {
        options: [],
        mediaList: [],
        advertList: [],
        form: {
          plan: {
            // 默认当天
            launch_date: commonJs.datetimeToTimestamp(new Date().toLocaleDateString()),
            ad_url: "",
            media: null,
            m_location: null,
            m_port: null,
            m_charge_sort: null,
            advertiser: null,
            a_charge_sort: null,
          },
          settlement:{
            m_unit_price:null,
            plan_launch_count:null,
            a_unit_price:null,

          }


        }
      }
    },
    methods: {
      createNewMedia() {
        this.$refs.editMediaDialog.open()
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

      //上传数据
      submitForm() {
        console.log(this.form)
        this.$service.createPlan(this.form).then(res => {
          if (res.code === 1000) {
            this.$message.success(res.msg)
            this.$router.push({name:"PlanList"})

          }

        })
      }
    },
    computed: {
      budget: {


        // getter
        get() {
          return commonJs.round(this.form.settlement.m_unit_price * this.form.settlement.plan_launch_count, 3)
        }
        ,
        // setter
        set(newValue) {
          //console.log(newValue)
        }
      }
    },
    mounted() {
      this.getMediaData();
      this.getOptionData();
      this.getAdvertData();
    }
  }
</script>

<style scoped>

</style>
