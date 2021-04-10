import { Pipe, PipeTransform } from '@angular/core';
import { Order, SortType } from '../models/list-settings';

@Pipe({
  name: 'sortType',
})
export class SortTypePipe implements PipeTransform {
  transform(order: Order): SortType {
    return order === 'DESC' ? SortType.DESC : SortType.ASC;
  }
}
