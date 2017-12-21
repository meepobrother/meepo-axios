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
    this.axios.get("https://meepo.com.cn/v1/cities1").then(res => {
      this.city = res.data;
    }).catch(error => { });
  }
}
