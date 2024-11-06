export interface ErrorResponse {
  message: string;
  details: string;
}

export interface CustomErrorInterface {
  detail?: string;
  code: number;
}
