import { NgModule, ModuleWithProviders } from '@angular/core';
import { AxiosService } from './axios/axios.service';
import { MeepoCoreServiceModule } from 'meepo-core';
import { Base64Module } from 'meepo-base64';

@NgModule({
    imports: [
        MeepoCoreServiceModule,
        Base64Module
    ],
    exports: [],
    declarations: [],
    providers: [
        AxiosService
    ]
})
export class AxiosModule {}
export { AxiosService } from './axios/axios.service';
