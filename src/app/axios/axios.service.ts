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

import { CoreService } from 'meepo-core';
import { Subject } from 'rxjs/Subject';
import { Base64Service } from 'meepo-base64';
@Injectable()
export class AxiosService {
    source: any = axios.CancelToken.source();
    default: AxiosRequestConfig = {
        cancelToken: this.source.token
    };
    time: any = new Date().getTime();
    constructor(
        public core: CoreService,
        public base64: Base64Service
    ) {
        console.log('axios servie', this.time);
        // 添加请求拦截器
        axios.interceptors.request.use((config) => {
            // 在发送请求之前做些什么
            this.core.showLoading({ type: 'skCircle', full: false });
            return config;
        }, (error) => {
            // 对请求错误做些什么
            this.core.closeLoading();
            this.core.showToast({ title: '请求错误', message: error.message, type: 'error' });
            return Promise.reject(error);
        });
        // 添加响应拦截器
        axios.interceptors.response.use((response) => {
            // 对响应数据做点什么
            this.core.closeLoading();
            return response;
        }, (error) => {
            this.core.closeLoading();
            this.core.showToast({ title: '响应错误', message: error.message, type: 'error' });
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

    bpost<T>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T> {
        config = { ...this.default, ...config };
        data = this.entry(data);
        return axios.post<T>(url, data, config);
    }

    entry(__body: any = {}) {
        const d = JSON.stringify(__body);
        const encrypted = this.base64.encode(d);
        // for angular
        return { encrypted: encrypted };
    }

    cancel(msg: string = 'cancel') {
        this.source.cancel(msg);
    }

    all(arr: any[]): Subject<any> {
        let s$: Subject<any> = new Subject();
        axios.all(arr).then(axios.spread((...results) => {
            s$.next(results);
        }));
        return s$;
    }
}