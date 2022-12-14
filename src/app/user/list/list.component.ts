import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  template: ` <p>user list works!</p> `,
  styles: [],
})
export class ListComponent implements OnInit {
  constructor() {
    // console.log(`user list works!`);
  }

  ngOnInit(): void {}
}
