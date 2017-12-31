import { Observable } from "rxjs/Observable";

export abstract class Axios {
    sn: string;
    constructor() { }
    abstract get<T>(url: string, config?: any): Observable<T>;

    abstract post<T>(url: string, body: any, config?: any): Observable<T>;

    abstract bpost<T>(url: string, body: any, config?: any): Observable<T>;

    abstract entry(__body: any): { encrypted: string };

    abstract cancel(): this;

    abstract all<T>(): Observable<T>;
}


import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { UuidService } from 'meepo-uuid';
import { CoreService } from 'meepo-core';
import { Base64Service } from 'meepo-base64';

@Injectable()
export class AxiosService implements Axios {
    sn: string;
    header: HttpHeaders = new HttpHeaders();
    constructor(
        public http: HttpClient,
        public uuid: UuidService,
        public base64: Base64Service
    ) {
        this.sn = this.uuid.v1();
        this.header.append("Content-Type", "application/x-www-form-urlencoded");
        console.log(this.header);
    }

    get<T>(url: string): Observable<T> {
        return this.http.get<T>(url, { headers: this.header });
    }

    post<T>(url: string, body: any): Observable<T> {
        return this.http.post<T>(url, body, { headers: this.header });
    }

    bpost<T>(url: string, body: any, config?: any): Observable<T> {
        let p = this.entry(body);
        return this.post(url, p);
    }

    entry(__body: any): { encrypted: string } {
        const d = JSON.stringify(__body);
        const encrypted = this.base64.encode(d);
        return { encrypted: encrypted };
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