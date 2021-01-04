import { axios } from "axios";
import VueAxios from 'vue-axios'
export function request(config, success, failure) {
    // 1.创建axios的实例
    const instance = axios.create({
        baseURL: 'http://39.106.26.6:8888/',
        timeout: 1000,
        headers: { 'X-Custom-Header': 'foobar' }
    })

    // 发送真正的网络请求
    instance(config)
        .then(res => {
            success(res);
        })
        .catch(err => {
            failure(err)
        })
}