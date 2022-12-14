import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { pluck } from 'rxjs';
import { CommentType } from './comment-type';
import { CommentService } from './comment.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent implements OnInit {
  // anything related to data we should use ActivatedRoute
  constructor(
    private commentService: CommentService,
    private route: ActivatedRoute
  ) {}
  // 1st way
  // comments$ = this.commentService.getComments();
  // 2nd way
  comments$ = this.route.data.pipe(pluck('comments'));
  comments: CommentType[] = [];
  ngOnInit(): void {
    // this.route.data.subscribe(({ comments }) => {
    //   console.log({ comments });
    // });

    // 3rd way
    this.route.data.subscribe((data) => {
      this.comments = data['comments'];
    });
  }
}
