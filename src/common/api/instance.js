/**
 *  axios 是Vue推荐的请求工具, 相关使用访问的文档地址: https://github.com/mzabriskie/axios
 *  [Tips] 此文件为统一错误处理文件，一般不需要修改
 */

import axios from "axios";
import {Notification} from "@u51/miox-vant";

/**
 * @param baseURL 请求的默认地址, 现在是一个iam的测试接口,请换成自己的接口地址
 * @returns {AxiosInstance}
 */

axios.defaults.timeout = 5000;
axios.defaults.withCredentials = true;

const errorMap = {
  400: '请求失败',
  401: '未授权',
  403: '禁止访问',
  404: '地址未找到',
  499: '未登陆',
};

// 返回结果拦截器,处理默认的错误
axios.interceptors.response.use(function (response) {
  // 正常的请求前拦截,在这里处理
  return response.data;
}, function (error) {
  // 非200请求时的错误处理
  const res = error.response.data; // 请求data
  const status = error.response.status; // 请求状态吗
  const message = res.message || (res.errors && res.errors[0].message); //错误消息

  Notification.error({
    message: errorMap[status] || '未知错误',
    description: message,
  });

  if (status === 499) {
    // iam 未登录错误
    window.location.href = res.url;
  }

  // Do something with response error
  return Promise.reject(error);
});

