export enum SortDirection {
  Asc = 'ASC',
  Desc = 'DESC',
}

export interface AuditPassportAuditorsParams {
  auditId: string;
  page: number;
  pageSize: number;
  sortColumn?: string;
  sortDirection?: SortDirection;
}
