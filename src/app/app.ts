import { NgModule } from '@angular/core';
import { AxiosService } from './axios/axios.service';
import { LoadingService } from './axios/loading.service';
import { ToasterService } from './axios/toaster.service';
@NgModule({
    imports: [],
    exports: [],
    declarations: [],
    providers: [
        AxiosService,
        LoadingService,
        ToasterService
    ],
})
export class AxiosModule { }
export { AxiosService } from './axios/axios.service';
export { LoadingService } from './axios/loading.service';
export { ToasterService } from './axios/toaster.service';
