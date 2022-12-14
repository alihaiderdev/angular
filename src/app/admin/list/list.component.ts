import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  template: ` <p>admin list works!</p> `,
  styles: [],
})
export class ListComponent implements OnInit {
  constructor() {
    // console.log(`admin list works!`);
  }

  ngOnInit(): void {}
}
