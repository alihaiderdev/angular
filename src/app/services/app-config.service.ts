import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppConfigService {
  private config: any;
  public configSubject$: Subject<any> = new Subject<any>();
  constructor(private http: HttpClient) {
    console.log('AppConfigService initialized');
  }

  loadConfig() {
    // console.log('app init calling');
    return this.http
      .get('./assets/config/config.json')
      .toPromise()
      .then((config: any) => {
        this.config = config;
        this.configSubject$.next(this.config);
      })
      .catch((err: any) => {
        console.error(err);
      });
  }

  getConfig() {
    return this.config;
  }
}
