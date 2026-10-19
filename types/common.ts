export interface PaginationResult<T> {
  items: T[];
  totalCount?: number;
  hasMore: boolean;
  lastDocId?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
