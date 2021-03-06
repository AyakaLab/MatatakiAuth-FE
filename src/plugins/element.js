import Vue from 'vue'
import Element from 'element-ui'
import '../element-variables.scss'

Vue.use(Element)

Vue.prototype.$message = Element.Message
Vue.prototype.$notify = Element.Notification
