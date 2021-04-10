export interface ListSettings {
  limit: number;
  offset: number;
  index: number;
  searchText: string;
  order: Order;
}

export type Order = 'DESC' | 'ASC';

export enum SortType {
  ASC = 0,
  DESC = 1,
}
