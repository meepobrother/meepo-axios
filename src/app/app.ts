import { NgModule, ModuleWithProviders } from '@angular/core';
import { AxiosService } from './axios/axios.service';
import { MeepoCoreModule } from 'meepo-core';
@NgModule({
    imports: [
        MeepoCoreModule.forRoot()
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
