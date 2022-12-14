import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { CommentType } from './comment-type';
import { CommentService } from './comment.service';

@Injectable({
  providedIn: 'root',
})
export class CommentGuard implements Resolve<CommentType[]> {
  constructor(private commentService: CommentService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): CommentType[] | Observable<CommentType[]> | Promise<CommentType[]> {
    return this.commentService.getComments();
  }
}
