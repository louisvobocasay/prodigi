export interface CoreReturnPaginationInterface {
  totalRecords: number;
  size: number;
  page: number;
}

export interface CoreResultsWithTotalRecordsInterface<T = unknown> {
  pagination: CoreReturnPaginationInterface;
  data: T[];
}
