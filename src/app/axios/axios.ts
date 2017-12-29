import { Observable } from "rxjs/Observable";

export abstract class Axios {
    sn: string;
    constructor(
        public base64: Base64Service
    ) { }
    abstract get<T>(url: string, config?: any): Observable<T>;

    abstract post<T>(url: string, body: any, config?: any): Observable<T>;

    abstract bpost<T>(url: string, body: any, config?: any): Observable<T>;

    entry(__body: any): { encrypted: string } {
        const d = JSON.stringify(__body);
        const encrypted = this.base64.encode(d);
        return { encrypted: encrypted };
    }

    abstract cancel(): this;

    abstract all<T>(): Observable<T>;
}


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { UuidService } from 'meepo-uuid';
import { CoreService } from 'meepo-core';
import { Base64Service } from 'meepo-base64';

@Injectable()
export class AxiosService extends Axios {
    sn: string;
    constructor(
        public http: HttpClient,
        public uuid: UuidService,
        public base64: Base64Service
    ) {
        super(base64);
        this.sn = this.uuid.v1();
    }

    get<T>(url: string, config?: any): Observable<T> {
        return this.http.get<T>(url, { headers: config });
    }

    post<T>(url: string, body: any, config?: any): Observable<T> {
        return this.http.post<T>(url, body, { headers: config });
    }

    bpost<T>(url: string, body: any, config?: any): Observable<T> {
        let p = this.entry(body);
        return this.post(url, p, config);
    }

    all<T>(): Observable<T> {
        return Observable.create(obse => {
            obse.next();
            obse.complete();
        });
    }

    cancel(): this {
        return this;
    }
}