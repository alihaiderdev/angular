import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'usdToPkr',
})
export class UsdToPkrPipe implements PipeTransform {
  transform(value: number, ...args: number[]): number {
    if (args.length > 0) {
      return value * args[0];
    }
    return value * 218.9;
  }
}
