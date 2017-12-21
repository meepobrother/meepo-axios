import { Injectable, Inject } from '@angular/core';
import {
    AxiosTransformer,
    AxiosAdapter,
    AxiosBasicCredentials,
    AxiosProxyConfig,
    AxiosRequestConfig,
    AxiosResponse,
    AxiosError,
    AxiosPromise,
    CancelStatic,
    Cancel,
    Canceler,
    CancelTokenStatic,
    CancelToken,
    CancelTokenSource,
    AxiosInterceptorManager,
    AxiosInstance,
    AxiosStatic
} from 'axios';
import axios from 'axios';
import { DOCUMENT } from '@angular/common';

import { LoadingService } from './loading.service';
import { ToasterService } from './toaster.service';

@Injectable()
export class AxiosService {
    source: any = axios.CancelToken.source();
    default: AxiosRequestConfig = {
        cancelToken: this.source.token
    };

    htmlStr = `
    <div class="sk-folding-cube">
        <div class="sk-cube1 sk-cube"></div>
        <div class="sk-cube2 sk-cube"></div>
        <div class="sk-cube4 sk-cube"></div>
        <div class="sk-cube3 sk-cube"></div>
    </div>
    `;
    constructor(
        public loading: LoadingService,
        public toaster: ToasterService
    ) {
        // 添加请求拦截器
        axios.interceptors.request.use((config) => {
            // 在发送请求之前做些什么
            this.loading.showLoading();
            return config;
        }, (error) => {
            // 对请求错误做些什么
            return Promise.reject(error);
        });
        // 添加响应拦截器
        axios.interceptors.response.use((response) => {
            // 对响应数据做点什么
            setTimeout(()=>{
                this.loading.hideLoading();
            },500);
            return response;
        }, (error) => {
            if(error.response.status === 404){
                this.toaster.info('没有找到相应服务！');
            }
            setTimeout(()=>{
                this.loading.hideLoading();
            },500);
            // 对响应错误做点什么
            return Promise.reject(error);
        });
    }

    get<T>(url: string, config?: AxiosRequestConfig): AxiosPromise<T> {
        config = { ...this.default, ...config }
        return axios.get<T>(url, config);
    }

    post<T>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T> {
        config = { ...this.default, ...config }
        return axios.post<T>(url, data, config);
    }

    cancel(msg: string = 'cancel') {
        this.source.cancel(msg);
    }
}