import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { AxiosService } from '../../src/app/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  city: any;
  constructor(
    public axios: AxiosService,
    public cd: ChangeDetectorRef
  ) {
  }

  ngOnInit() {

  }

  getCity() {
    let c1 = this.axios.get("https://meepo.com.cn/v1/cities");
    let c2 = this.axios.get("https://meepo.com.cn/v1/cities");
    let s$ = this.axios.all([c1, c2]).subscribe(res => {
      console.log(res);
      this.city = res[0].data;
      console.log(this.city);
      s$.unsubscribe();
    });
  }
}
