import { NgModule, ModuleWithProviders } from '@angular/core';
import { AxiosService } from './axios/axios.service';
import { MeepoCoreServiceModule } from 'meepo-core';
import { Base64Module } from 'meepo-base64';

@NgModule({
    imports: [
        MeepoCoreServiceModule,
        Base64Module.forRoot()
    ],
    exports: [],
    declarations: []
})
export class AxiosModule {
    public static forRoot(): ModuleWithProviders {
        return {
            ngModule: AxiosModule,
            providers: [
                AxiosService
            ]
        }
    }
}
export { AxiosService } from './axios/axios.service';
