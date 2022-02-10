export interface CoreProductsFilterConditionsInterface {
  title: string;
  brand: number | number[];
  type: number | number[];
  fromPrice: number;
  toPrice: number;
  discount: number;
  fromDate: Date | string;
  toDate: Date | string;
}
