import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
// import axios from 'axios'
// import qs from 'qs'

Vue.use(Vuex)

// Vue.prototype.axios = axios
// Vue.prototype.qs = qs
//
// changeBalance()
// {
//   this.axios({
//     method: "post",
//     url: `${this.baseUrl}/trade/addBalance`,
//     data: {
//       "phone": this.userinfo.phone,
//       "newAmount":this.userinfo.newAmount
//     },
//     headers: {
//       'Content-Type': 'application/json; charset=UTF-8'
//     }
//   })
//     .then((response) => {
//       console.log(response);
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// }
//
// changePoints()
// {
//   this.axios({
//     method: "post",
//     url: `${this.baseUrl}/trade/addPoints`,
//     data: {
//       "phone": this.userinfo.phone,
//       "newPoint":this.userinfo.newPoint
//     },
//     headers: {
//       'Content-Type': 'application/json; charset=UTF-8'
//     }
//   })
//     .then((response) => {
//       console.log(response);
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// }

// getUserId()
// {
//   this.axios({
//     method: "get",
//     url: `${this.baseUrl}/trade/getUserId`,
//     data: {
//       "phone": this.userinfo.phone
//     },
//     headers: {
//       'Content-Type': 'application/json; charset=UTF-8'
//     }
//   })
//     .then((response) => {
//       console.log(response);
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// }







// 应用初始状态
const state = {
  count: 10
}
// 定义所需的 mutations
const mutations = {
    Increment(state) {
        state.count++
    },
    Decrement(state) {
        state.count--
    }
}

// 创建 vuex 实例
export default new Vuex.Store({
    actions,
    getters,
    state,
    mutations
})
