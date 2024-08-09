export interface PaginatetResponse<T> {
  data: T[];
  page: number;
  perPage: number;
  total: number;
}
