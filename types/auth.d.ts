interface ErrorResponse {
  error: string;
  message: string[];
  statusCode: number;
}

interface VerificationResponse {
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
