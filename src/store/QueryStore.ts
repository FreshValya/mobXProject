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

  apiFunction: () => Promise<T>;

  @action
  async makeQuery() {
    this.isLoading = true;
    this.isError = false;

    try {
      this.data = await this.apiFunction();
      this.isSuccess = true;
    } catch (error) {
      this.isError = true;
      console.error(`Error happened: ${error}`);
    } finally {
      this.isLoading = false;
    }
  }
}
