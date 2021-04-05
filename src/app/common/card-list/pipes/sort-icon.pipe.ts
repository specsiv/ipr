import { Pipe, PipeTransform } from '@angular/core';
import { SortType } from '../models/list-settings';

@Pipe({
  name: 'sortIcon',
})
export class SortIconPipe implements PipeTransform {
  transform(type: SortType): string {
    return type ? 'sort' : 'reversed-sort';
  }
}
