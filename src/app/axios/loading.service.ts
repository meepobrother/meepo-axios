import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import * as config from './loading/index';

@Injectable()
export class LoadingService {
    inited: boolean = false;
    loadingElement: any;
    loadingName: config.LoadingTypes = 'skCube';

    constructor(
        @Inject(DOCUMENT) public document: any
    ) { }

    createByName(name: config.LoadingTypes) {
        // html
        this.loadingElement = this.document.createElement('div');
        this.loadingElement.innerHTML = config[name].html;
        this.loadingElement.className = 'meepo-loading';
        this.loadingElement.id = 'meepo-loading';
        this.document.body.appendChild(this.loadingElement);
        // css
        let styleStr = this.document.createElement('style');
        styleStr.innerHTML = config[name].css;
        styleStr.type = 'text/css';
        this.document.head.appendChild(styleStr);
    }

    setLoading(name: config.LoadingTypes) {
        this.loadingName = name;
    }

    showLoading() {
        this.createByName(this.loadingName);
    }

    hideLoading() {
        this.document.body.removeChild(this.loadingElement)
    }

}