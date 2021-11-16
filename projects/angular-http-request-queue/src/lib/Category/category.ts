import { Request } from '../Request';

export class Category {
  public uuid: string;
  public requests: Request<any>[];

  constructor(customUUID?: string) {
    if (customUUID) {
      this.uuid = customUUID;
    } else {
      this.uuid = this.generateUUID();
    }
    this.requests = [];
  }

  private generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (
      c
    ) {
      var r = (Math.random() * 16) | 0,
        v = c == 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  public addRequest<T>(request: Request<T>) {
    this.requests.push(request);
    return request;
  }

  public getAccessibleRequests() {
    return this.requests.filter((x) => x.accessible);
  }

  public removeInAccessibleRequests() {
    this.requests = this.requests.filter((x) => x.accessible);
  }
}
