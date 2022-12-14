import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface PostType {
  userId?: number;
  id: number;
  title: string;
  body: string;
}
@Injectable({
  providedIn: 'root',
})
export class BookingService {
  constructor(private http: HttpClient) {}

  bookRoom(post: PostType) {
    return this.http.post(`https://jsonplaceholder.typicode.com/posts`, post);
    // .subscribe((post) => {
    //   console.log(post);
    // });
  }
}
