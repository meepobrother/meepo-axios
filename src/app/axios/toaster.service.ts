import { Injectable } from '@angular/core';
@Injectable()
export class ToasterService {

    constructor() {

    }

    info(config: any) {
        console.log(config);
    }
}