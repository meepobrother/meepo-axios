import { NgModule, ModuleWithProviders } from '@angular/core';
import { AxiosService, Axios } from './axios/axios';
import { MeepoCoreServiceModule } from 'meepo-core';
import { Base64Module } from 'meepo-base64';
import { HttpClientModule } from '@angular/common/http';
import { UuidModule } from 'meepo-uuid';
@NgModule({
    imports: [
        MeepoCoreServiceModule,
        Base64Module,
        HttpClientModule,
        UuidModule
    ],
    exports: [],
    declarations: [],
    providers: [
        AxiosService
    ]
})
export class AxiosModule {}
export { AxiosService } from './axios/axios';
