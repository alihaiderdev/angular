import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { map } from 'rxjs';
import { AppConfigService } from './../services/app-config.service';
import { ConfigService } from './../services/config.service';

@Component({
  selector: 'app-user',
  template: `
    <h1>Selected user id: {{ userId }} {{ id }} {{ id$ | async }}</h1>
    <a
      (click)="goPrevious()"
      class="bg-indigo-600 text-white px-3 py-1 rounded-md cursor-pointer"
      >Previous</a
    >
    <a
      (click)="goNext()"
      class="bg-indigo-600 text-white px-3 py-1 rounded-md ml-4 cursor-pointer"
      >Next</a
    >
    <a
      (click)="goBack()"
      class="bg-indigo-600 text-white px-3 py-1 rounded-md ml-4 cursor-pointer"
      >Back</a
    >
  `,
  styles: [],
})
export class UserComponent implements OnInit {
  userId: number = 0;
  id: number = 0;
  id$ = this.route.params.pipe(map((params) => params['id']));
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private appConfigService: AppConfigService,
    private configService: ConfigService
  ) {
    // let id = parseInt(this.route.snapshot.paramMap.get('id')!);
    this.route.paramMap.subscribe((params: ParamMap) => {
      if (params.has('id')) {
        this.userId = parseInt(params.get('id')!);
        console.log({ params });
      }
    });
    // console.log(`User id: ${this.route.snapshot.paramMap.get('id')}`);
  }
  ngOnInit(): void {
    // console.log(`User id is: ${this.route.snapshot.paramMap.get('id')}`);
    // snapshot will never update the data in case we are changing the value in the same view
    // this.id = this.route.snapshot.params['id'];
    this.route.params.subscribe((params) => {
      console.log(params['id']);
      // by using params if the access key is not exist then it will through an exception while using params map we can first check the key by using has method and then access it
      this.id = params['id'];
    });
  }

  goPrevious() {
    let id = this.userId - 1;
    this.router.navigate(['/users', id]);
  }

  goNext() {
    let id = this.userId + 1;
    this.router.navigate(['/users', id]);
  }

  goBack() {
    let selectedId = this.userId ? this.userId : null;
    // this.router.navigate(['/users', { id: selectedId }]); // for absolute paths
    this.router.navigate(['../', { id: selectedId }], {
      relativeTo: this.route,
    }); // for relative paths
  }
}
