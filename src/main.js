import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Qs from 'qs'
import store from './store'
import md5 from 'js-md5'

Vue.config.productionTip = false
Vue.use(ElementUI)

Vue.prototype.$axios = axios
Vue.prototype.$Qs = Qs
Vue.prototype.$md5 = md5

// 封装axios
// 封装失败!!!!!!
// Vue.prototype.crear = function(para, prot, src, result) {
//     let data = Qs.stringify(para);
//     axios({
//         method: prot,
//         url: src,
//         headers: {
//             "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
//         },
//         data,
//     }).then(res => {
//         result(res)
//     });
// }

new Vue({
    store,
    router,
    render: h => h(App)
}).$mount('#app')