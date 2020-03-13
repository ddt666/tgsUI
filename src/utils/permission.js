import store from '@/store'
import Vue from 'vue'

export function hasBtnPermission(route,action) {

 const button=route.meta.title+":"+action
  const myBtns = store.getters.buttons
  console.log(button,myBtns)
  return myBtns.indexOf(button)>-1

}
