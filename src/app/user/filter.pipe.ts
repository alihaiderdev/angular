import { Pipe, PipeTransform } from '@angular/core';
import { User } from './../models/user';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(users: any[], price: number): User[] {
    console.log(users.filter((user) => user?.id > price));

    return users.filter((user) => user?.id > price);
  }
}
