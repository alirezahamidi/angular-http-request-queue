import { RequestOptions } from './request-options';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { RequestRunType } from './request-run-type';
import { RequestType } from './request-type';
import { HttpClient } from '@angular/common/http';

export class Request<T> {
  private requestStatus: BehaviorSubject<string> = new BehaviorSubject<string>(
    ''
  );
  public requestStatus$ = this.requestStatus.asObservable();
  private request$: Observable<any>;
  private response: Subject<T | any> = new Subject<T>();
  public response$: Observable<T> = this.response.asObservable();
  public accessible: boolean = true;
  private error = new Subject();
  public error$ = this.error.asObservable();

  constructor(
    private url: string,
    private type: RequestType,
    private body: any,
    private http: HttpClient,
    private options?: RequestOptions,
    private runType?: RequestRunType
  ) {
    this.requestStatus.next('created');
    this.request$ = this.createRequest();
    if (options) {
      if (options.runImmidiatly) {
        this.start();
      }
    }
  }

  private createRequest(): Observable<any> {
    this.requestStatus.next('fireReady');

    let options: any = (this.options?.httpRequestOptions) ? this.options?.httpRequestOptions : {};

    switch (this.type) {
      case RequestType.get:
        return this.http.get<T>(this.url, options);
      case RequestType.post:
        return this.http.post<T>(this.url, this.body, options);
      case RequestType.delete:
        return this.http.delete<T>(this.url, options);
      case RequestType.put:
        return this.http.put<T>(this.url, this.body, options);
      case RequestType.patch:
        return this.http.patch<T>(this.url, this.body, options);
    }
  }

  public start() {
    this.accessible = false;
    this.requestStatus.next('fired');
    this.request$.subscribe(
      (x) => {
        this.requestStatus.next('success');
        this.response.next(x);
      },
      (err) => {
        if (err) {
          this.response.error(err);
          this.error.next(err);
        }
      }
    );
  }
}
