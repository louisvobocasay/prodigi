import { FindConditions, ObjectLiteral } from 'typeorm';

export interface PaginationInterface {
  page: string;
  size: string;
}

export class PaginationModel {
  /**
   *
   */
  constructor(public page: any, public size: any) {
    if (page) {
      this.page = Number(page);
      if (this.page <= 0) {
        this.page = 0;
      }
    } else {
      this.page = 0;
    }

    if (size) {
      this.size = Number(size);
      if (this.size > 0) {
      } else {
        this.size = 20;
      }
    } else {
      this.size = 20;
    }
  }
}

export interface BaseParameter<
  T =
    | { [key: string]: any }
    | FindConditions<any>[]
    | FindConditions<any>
    | ObjectLiteral
    | string,
> {
  pagination: PaginationModel;
  condition: T;
  sort: [string, 'DESC' | 'ASC'];
  select?: string[];
}
