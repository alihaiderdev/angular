import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommentType } from './comment-type';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor(private http: HttpClient) {}
  getComments() {
    return this.http.get<CommentType[]>(
      `https://jsonplaceholder.typicode.com/comments`
    );
  }
}
