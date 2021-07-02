export interface ResponseAPI<T> {
  data: T[];
  offset: number;
  limit: number;
}
