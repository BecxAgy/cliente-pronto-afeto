export interface State<T> {
  errors: {
    [K in keyof T]?: string[];
  };
  message?: string | null;
  error?: boolean;
}
