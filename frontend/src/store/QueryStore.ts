import {action, computed, makeObservable, observable} from 'mobx';

export class QueryStore<T> {
  @observable data: T | null = null;
  @observable isLoading = false;
  @observable isSuccess = false;
  @observable isError = false;

  @computed
  get isData() {
    return Boolean(this.data);
  }

  constructor() {
    makeObservable(this);
  }

  apiFunction: (payload?: any) => Promise<T>;

  @action
  async makeQuery(payload?: any) {
    this.isLoading = true;
    this.isError = false;

    try {
      //TODO попровобоавать перевести на @tanstack-query/core
      this.data = await this.apiFunction(payload);
      this.isSuccess = true;
    } catch (error) {
      this.isError = true;
      console.error(`Error happened: ${error}`);
    } finally {
      this.isLoading = false;
    }
  }
}
