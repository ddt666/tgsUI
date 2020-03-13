import Axios from 'axios'
import commonJs from "@/utils/common"
import VueCookies from "vue-cookies"
import qs from 'qs'
import {Message} from "element-ui";
import store from '@/store'


const baseUrl = "http://122.51.96.111:8000/";
// const baseUrl = "http://127.0.0.1:8000/"
// Axios.defaults.withCredentials = true;
Axios.defaults.baseURL = baseUrl;
Axios.defaults.headers['Content-Type'] = 'application/json'
Axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  if (VueCookies.get('token')) {
    // Axios.defaults.headers.common['Authorization'] = localStorage.getItem('access_token');
    // console.log(config.headers);
    config.headers.Authorization = VueCookies.get('token')
  }
  // 更改加载的样式


  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
})

//Axios.defaults.headers['Authorization'] = VueCookies.get("token")


export const login = (data) => {
  return Axios.post("login", data).then(res => res.data)
}

export const logout = () => {
  return Axios.post("logout",).then(res => res.data)
}
export const getUserInfo = (data) => {
  return Axios.get("userInfo", data).then(res => res.data)
}


export const getMedia = (params) => {
  params = commonJs.obj.removeNullKey(params)
  console.log("params", params)

  return Axios.get('media', {
    params: params
  }).then(res => res.data)
}
export const getAllMedia = () => {


  return Axios.get('media',).then(res => res.data)
}
export const getAllAdvert = () => {


  return Axios.get('advertisers',).then(res => res.data)
}

export const createAdvertiser = (data) => {


  return Axios.post('advertisers', data).then(res => res.data)
}
export const getPlanList = (params) => {

  params = commonJs.obj.removeNullKey(params)
  return Axios.get('plans', {
    params
  }).then(res => res.data)
}

export const getPlanObj = (id) => {


  return Axios.get(`plans/${id}`,).then(res => res.data)
}
export const editPlan = (data) => {


  return Axios.patch(`plans/${data.id}`, data).then(res => res.data)
}
export const batchCreatPlans = (data) => {

  const settlement_info = commonJs.obj.copyByKey(data.settlement_info, ["m_unit_price",
    "plan_launch_count",
    "a_unit_price"])
  let newData = commonJs.obj.copyByKey(data, [
    "ad_url",
    "media",
    "m_location",
    "m_port",
    "m_charge_sort",
    "advertiser",
    "a_charge_sort",
    "remark"])

  newData.settlement_info = {...settlement_info}
  newData.launch_date_range = data.launch_date_range
  data = {
    create: newData
  }
  return Axios.post(`plans/batch`, data).then(res => res.data)
}


export const editSettlement = (data) => {


  return Axios.patch(`settlements/${data.id}`, data).then(res => res.data)
}


export const getMediaRetrieve = (id) => {
  return Axios.get(`media/${id}`).then(res => res.data)
}

export const editMedia = (data) => {
  return Axios.patch(`media/${data.id}`, data).then(res => res.data)
}
export const mediaSort = () => {
  return Axios.get('media_sorts').then(res => res.data)
}


export const CreateNewMedia = (data) => {
  return Axios.post('media', data).then(res => res.data)
}

export const createLocation = (data) => {
  return Axios.post('locations', data).then(res => res.data)
}

export const createPort = (data) => {
  return Axios.post('ports', data).then(res => res.data)

}
export const createChargeSort = (data) => {
  return Axios.post('chargeSorts', data).then(res => res.data)
}

export const getServiceList = () => {
  return Axios.get(`service`).then(res => res.data)
}


export const getAdServiceObj = (serv_id) => {
  return Axios.get(`service/${serv_id}`).then(res => res.data)
}


export const CreateMediaData = (data) => {
  data = commonJs.obj.removeNullKey(data)
  return Axios.post('mediaData', data).then(res => res.data)
}

export const CreateAdData = (data) => {
  data = commonJs.obj.removeNullKey(data)
  return Axios.post('adData', data).then(res => res.data)
}

export const getOptions = () => {

  return Axios.get('options').then(res => res.data)
}

export const createPlan = (data) => {

  return Axios.post("plans", data).then(res => res.data)
}


export const getSettlementList = (params) => {

  params = commonJs.obj.removeNullKey(params)
  return Axios.get('settlements', {
    params
  }).then(res => res.data)
}

export const getStatements = (params) => {

  params = commonJs.obj.removeNullKey(params)
  return Axios.get('statements', {
    params
  }).then(res => res.data)
}

export const checkAdvert = (params) => {

  params = commonJs.obj.removeNullKey(params)
  return Axios.get('advertCheckout', {
    params
  }).then(res => res.data)
}

export const getMediaHistoryStatements = (params) => {
  params = commonJs.obj.copyByKey(params, [
    "media"

  ]);
  return Axios.get('mediaStatements', {params}).then(res => res.data)
}

export const getAdvertStatements = (params) => {
  params = commonJs.obj.copyByKey(params, [
    "advertiser"

  ]);
  return Axios.get('advertStatements', {params}).then(res => res.data)
}


export const checkstatementSuccess = (data) => {

  return Axios.post('statements', data).then(res => res.data)
}


//advertStatements

export const createAdvertStatement = (data) => {

  return Axios.post('advertStatements', data).then(res => res.data)
}

export const exportExcel = (params) => {

  let queryStr = qs.stringify(params)
  window.open(baseUrl + 'export?' + queryStr);
}
export const exportAdvertStatementToExcel = (params) => {

  let queryStr = qs.stringify(params)
  window.open(baseUrl + 'exportAdvertStatement?' + queryStr);
}


// 添加响应拦截器
Axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  //console.log(response)

  const res = response.data
  //大于4000登录认证没通过，统一退出重新登录
  if (res.code > 4000) {

    store.dispatch('logout')
  }

  if (res.code < 0) {
    Message({
      message: res.msg,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(res.msg)
  }
  return response;
}, function (error) {
  // 对响应错误做点什么
  console.log("error", error.response)

  if (error.response.data) {
    const error_res = error.response.data
    //console.log("error_res",error_res)
    //大于4000登录认证没通过，统一退出重新登录
    if (error_res.code > 4000) {

      VueCookies.remove("token")
      window.location.reload()
    }
  }


  return Promise.reject(error);
});
