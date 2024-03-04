import {axiosInstance} from '@api/base';

const headers = {
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyYjQxNWMwMGViOTIyMDAxZjU3ZTdjNGNmM2ExYzAyMCIsInN1YiI6IjY0Yjk3NDRmMDZmOTg0MDBjNGYxNDgzYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.V5gGKAlVXfB395emdvJyMLe6KTZkUxg6xUQBzMOiYzU',
  },
};

type RequestResponse = {
  success: boolean;
  expires_at: Date;
  request_token: string;
};

type SessionResponse = {
  success: boolean;
  expires_at: Date;
  request_token: string;
};

export type CreateSessionPayload = {
  username: string;
  password: string;
};

interface Avatar {
  gravatar: {
    hash: string;
  };
  tmdb: {
    avatar_path: string | null;
  };
}

type AccountResponse = {
  avatar: Avatar;
  id: number;
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  include_adult: boolean;
  username: string;
};

type LogoutResponse = {
  success: boolean;
};

export interface SignUpPayload {
  email: string;
  username: string;
  password: string;
}

interface SignUpResponse {
  success: boolean;
  result: null;
  message: string;
}

export interface SignInPayload {
  email: string;
  password: string;
  remember: boolean;
}

interface SignInResponse {
  success: boolean;
  result: null;
  message: string;
}

interface SignOutResponse {
  success: boolean;
  result: null;
  message: string;
}

interface VerifyTokenResponse {
  success: boolean;
  result: null;
  message: string;
}

export const authApi = {
  getRequestToken: async () => {
    const response = await axiosInstance.get<RequestResponse>(
      'https://api.themoviedb.org/3/authentication/token/new',
      headers,
    );
    return response.data;
  },
  createSession: async (requestToken: string, payload: CreateSessionPayload) => {
    const response = await axiosInstance.post<SessionResponse>(
      'https://api.themoviedb.org/3/authentication/token/validate_with_login',
      {
        ...payload,
        request_token: requestToken,
      },
      headers,
    );

    return response.data;
  },
  deleteSession: async (sessionID: number) => {
    const response = await axiosInstance.delete<LogoutResponse>('https://api.themoviedb.org/3/authentication/session', {
      data: {
        session_id: sessionID,
      },
      ...headers,
    });
    return response.data;
  },
  getAccountId: async (sessionID: string) => {
    const response = await axiosInstance.get<AccountResponse>('https://api.themoviedb.org/3/account', {
      params: {api_key: '2b415c00eb922001f57e7c4cf3a1c020', session_id: sessionID},
    });
    return response.data;
  },
  signUp: async (payload: SignUpPayload) => {
    const response = await axiosInstance.post<SignUpResponse>('signUp', payload);
    return response;
  },
  signIn: async (payload: SignInPayload) => {
    const response = await axiosInstance.post<SignInResponse>('signIn', payload);
    return response;
  },
  signOut: async () => {
    const response = await axiosInstance.post<SignOutResponse>('signOut');
    return response;
  },
  verifyToken: async () => {
    const response = await axiosInstance.get<VerifyTokenResponse>('verify');
    return response;
  },
};
