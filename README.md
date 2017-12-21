## meepo axios

> 已对加载中及错误进行处理

- 安装

```sh
yarn add meepo-axios
# or
npm install --save meepo-axios
```

- 导入

```ts
import { AxiosModule } from 'meepo-axios';
import { MeepoCoreModule } from 'meepo-core';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AxiosModule.forRoot(),
    MeepoCoreModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```
- 使用

```html
<core-root></core-root>
```

```ts
import { AxiosService } from 'meepo-axios';

// get
let c1 = this.axios.get("https://meepo.com.cn/v1/cities1").then(res=>{
    console.log(res);
}).cache(err=>{
    console.log(err)
});;

// post
let data = {};
let c1 = this.axios.post("https://meepo.com.cn/v1/cities1",data).then(res=>{
    console.log(res);
}).cache(err=>{
    console.log(err)
});

// 合并请求
let c1 = this.axios.get("https://meepo.com.cn/v1/cities1");
let c2 = this.axios.get("https://meepo.com.cn/v1/cities2");
let s$ = this.axios.all([c1, c2]).subscribe(res => {
    s$.unsubscribe();
});
```