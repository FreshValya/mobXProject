import {action, makeObservable, observable} from 'mobx';

import {SignInPayload, SignUpPayload, authApi} from '@api/auth';
import {axiosInstance} from '@api/base';

interface Data {
  requestToken?: string;
  sessionId?: string;
}

export class AuthStore {
  constructor() {
    const authCookie = document.cookie
      .split('; ')
      .find((str) => str.startsWith('wasted_token'))
      ?.split('=')[1];

    if (authCookie) {
      axiosInstance.defaults.headers.common.Authorization = authCookie;
      this.isAuthenticated = true;
    }

    makeObservable(this);
  }

  @observable data: Data = {};
  @observable isAuthenticated = false;
  @observable isLoading = false;
  @observable isError = false;

  @action
  async signUp(payload: SignUpPayload) {
    this.isError = false;
    this.isLoading = true;

    try {
      await authApi.signUp(payload);
    } catch (error) {
      this.isError = true;
      console.error(`Error happened: ${error}`);
    } finally {
      this.isLoading = false;
    }
  }

  @action
  async signIn(payload: SignInPayload) {
    this.isError = false;
    this.isLoading = false;

    try {
      const response = await authApi.signIn(payload);
      // axiosInstance.defaults.headers.common.Authorization = response.data.token;

      this.isAuthenticated = response.data.success;
    } catch (error) {
      this.isError = true;
      console.error(`Error happened: ${error}`);
    } finally {
      this.isLoading = false;
    }
  }

  async signOut() {
    this.isError = false;
    this.isLoading = false;

    try {
      const response = await authApi.signOut();

      // axiosInstance.defaults.headers.common.Authorization = '';
      // document.cookie = 'wasted_token= ; expires = Thu, 01 Jan 1970 00:00:00 GMT';

      this.isAuthenticated = !response.data.success;
    } catch (error) {
      this.isError = true;
      console.error(`Error happened: ${error}`);
    } finally {
      this.isLoading = false;
    }
  }

  // @action
  // async signInOld(payload: CreateSessionPayload) {
  //   this.isError = false;
  //   this.isLoading = true;
  //
  //   try {
  //     const requestTokenResponse = await authApi.getRequestToken();
  //     this.data.requestToken = requestTokenResponse.request_token;
  //
  //     const sessionResponse = await authApi.createSession(this.data.requestToken, payload);
  //     this.data.sessionId = sessionResponse.request_token;
  //     this.isAuthenticated = sessionResponse.success;
  //   } catch (error) {
  //     this.isError = true;
  //     console.error(`Error happened: ${error}`);
  //   } finally {
  //     this.isLoading = false;
  //   }
  // }
  //
  // @action
  // async logout() {
  //   this.isError = false;
  //   this.isLoading = true;
  //
  //   try {
  //     const logoutResponse = await authApi.deleteSession(Number(this.data.sessionId));
  //     this.isAuthenticated = logoutResponse.success;
  //   } catch (error) {
  //     this.isError = true;
  //     console.error(`Error happened: ${error}`);
  //   } finally {
  //     this.isLoading = false;
  //   }
  // }
}
