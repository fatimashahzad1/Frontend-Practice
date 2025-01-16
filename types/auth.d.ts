interface ErrorResponse {
  error: string;
  message: string[] | string;
  statusCode: number;
}

interface SuccessResponse {
  message: string;
  success?: string;
  statusCode?: string;
}

interface RegisterResponse {
  success: string;
  message: string;
  statusCode: number;
  user: { name: string; email: string };
}
