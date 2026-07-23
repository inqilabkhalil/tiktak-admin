export interface LoginPayload {
  phone: string;
  password: string;
}

export interface LoginResponse {
  tokens: {
    access_token: string;
    refresh_token: string;
  };
}

export interface AuthState {
  loading: boolean;
  error: string | null;
  login: (payload: LoginPayload) => Promise<void>;
}
