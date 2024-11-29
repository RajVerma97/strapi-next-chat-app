export interface LoginUserData {
  email: string;
  password: string;
}

export interface User {
  blocked: boolean;
  confirmed: boolean;
  createdAt: string;
  documentId: string;
  email: string;
  id: number;
  provider: string;
  publishedAt: string;
  updatedAt: string;
  username: string;
}

export interface LoginAuthResponse {
  token: string;
  user: User;
  message: string;
}
