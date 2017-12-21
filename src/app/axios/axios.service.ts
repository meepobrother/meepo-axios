import { Injectable } from '@angular/core';
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

import { Subject } from 'rxjs/Subject';
@Injectable()
export class AxiosService {

    constructor() { }

    get<T>(url: string, config?: AxiosRequestConfig): AxiosPromise<T> {
        return axios.get<T>(url, config);
    }

    post<T>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T> {
        return axios.post<T>(url, data, config);
    }
}