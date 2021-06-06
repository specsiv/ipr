export interface ListSettings {
  readonly limit: number;
  readonly offset: number;
  readonly index: number;
  readonly searchText: string;
  readonly order: Order;
}

export type Order = 'DESC' | 'ASC';

export enum SortType {
  ASC = 0,
  DESC = 1,
}
