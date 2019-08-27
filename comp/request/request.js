/**
 * @Author: hanguangtian
 * @Date:   2018/5/28
 * @功能：
 * request封装，所有请求都走这里
 * option = {
 *      url:请求地址
 *      method: 'post' // 请求方式，post\get
 *      data: {}, // 参数
 * }
 * request(option)
 .then(data => {
                console.log('then', data);
            })
 .catch(data => {
                console.log('catch', data);
            });
 */

import axios from 'axios';
import config from '../../config/config';

const request = {
    get: option => {
        const url = option.url;
        const originalData = option.param || {};

        let params = {};
        for (const key in originalData) {
            if (
                originalData[key] !== null &&
                originalData[key] !== undefined &&
                originalData[key] !== ''
            ) {
                params[key] = originalData[key];
            }
        }

        return axios({url, params: {...params}, method: 'get', withCredentials: true})
            .then(res => {
                const resData = res.data;
                if (resData === '') {
                    // 未登录
                } else if (resData.header && resData.header.errNo === 200) {
                    return resData.body || {};
                } else {
                    throw resData;
                }
            })
            .catch(res => {
                throw res;
            });
    },
    post: option => {
        const url = option.url;
        const originalData = option.param || {};

        let data = {};
        for (const key in originalData) {
            if (
                originalData[key] !== null &&
                originalData[key] !== undefined &&
                originalData[key] !== ''
            ) {
                data[key] = originalData[key];
            }
        }

        return axios({url, data: {...data}, method: 'post', withCredentials: true})
            .then(res => {
                const resData = res.data;
                const header = resData.header;
                if (header) {
                    if (header.errNo === 200) {
                        return resData.body || {};
                    } else if (header.errNo === 402 || header.errNo === 405) {
                        // 无效token，请重新登录
                        const href = encodeURIComponent(location.href);
                        location.href = `${config.passportUrl}?refer=${href}`;
                    } else {
                        throw resData;
                    }
                } else {
                    if (res.status != 204) {
                        throw resData;
                    }
                }
            })
            .catch(res => {
                throw res;
            });
    }
};
export default request;
