import Vue from 'vue'
import Notice from '../../components/Notice.vue'
// extend 使用基础 Vue 构造器，创建一个“子类”。参数是一个包含组件选项的对象。
const constructor = Vue.extend(Notice)

let notice;
const createExtend = (options) => {
  // propsData 创建实例时传递 props
  notice = new constructor({
    propsData: {
      ...options
    }
  })
  notice.$mount()
  notice.remove = () => {
    document.body.removeChild(notice.$el)
    notice.$destroy()
  }
  document.body.appendChild(notice.$el);
  notice.show()
  return notice;
}

export default createExtend;