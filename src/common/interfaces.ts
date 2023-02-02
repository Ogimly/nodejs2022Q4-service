export interface RequestResult<T> {
  data: T | null;
  status: number;
  error?: string;
}
