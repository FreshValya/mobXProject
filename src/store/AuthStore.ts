import {action, makeObservable, observable} from 'mobx';

import {CreateSessionPayload, authApi} from '@api/auth';

interface Data {
  requestToken?: string;
  sessionId?: string;
}

export class AuthStore {
  constructor() {
    makeObservable(this);
  }

  @observable data: Data = {};
  @observable isAuthenticated = false;
  @observable isLoading = false;
  @observable isError = false;

  @action
  async login(payload: CreateSessionPayload) {
    this.isError = false;
    this.isLoading = true;

    try {
      const requestTokenResponse = await authApi.getRequestToken();
      this.data.requestToken = requestTokenResponse.request_token;

      const sessionResponse = await authApi.createSession(this.data.requestToken, payload);
      this.data.sessionId = sessionResponse.request_token;
      this.isAuthenticated = sessionResponse.success;
    } catch (error) {
      this.isError = true;
      console.error(`Error happened: ${error}`);
    } finally {
      this.isLoading = false;
    }
  }

  @action
  async logout() {
    this.isError = false;
    this.isLoading = true;

    try {
      const logoutResponse = await authApi.deleteSession(Number(this.data.sessionId));
      this.isAuthenticated = logoutResponse.success;
    } catch (error) {
      this.isError = true;
      console.error(`Error happened: ${error}`);
    } finally {
      this.isLoading = false;
    }
  }
}
