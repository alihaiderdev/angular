import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommentComponent } from './comment.component';
import { CommentGuard } from './comment.guard';

const routes: Routes = [
  {
    path: '',
    component: CommentComponent,
    resolve: { comments: CommentGuard }, // by using this comments key or whatever name of key we set here we can access the data in our component
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommentRoutingModule {}
