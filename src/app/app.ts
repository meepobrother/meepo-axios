import { NgModule } from '@angular/core';
import { AxiosService } from './axios/axios.service';
import { MeepoCoreModule } from 'meepo-core';
@NgModule({
    imports: [
        MeepoCoreModule.forRoot()
    ],
    exports: [],
    declarations: [],
    providers: [
        AxiosService
    ],
})
export class AxiosModule { }
export { AxiosService } from './axios/axios.service';
