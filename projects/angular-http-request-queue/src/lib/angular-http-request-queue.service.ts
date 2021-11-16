import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Queue } from './Queue';
import { Request, RequestRunType, RequestType } from './Request';
import { Observable } from 'rxjs';
import { HttpReqeustOptions } from './Request/http-request-options';

@Injectable({
  providedIn: 'root'
})
export class AngularHttpRequestQueueService {
  queue: Queue;

  constructor(private http: HttpClient) {
    this.queue = new Queue();
  }

  get<T>(url: string, options?: HttpReqeustOptions): Observable<T> {
    return new Request<T>(url, RequestType.get, {}, this.http,
      { runImmidiatly: true, httpRequestOptions: options }, RequestRunType.normal
    ).response$;
  }
  post<T>(url: string, body: any, options?: HttpReqeustOptions): Observable<T> {
    return new Request<T>(url, RequestType.post, body, this.http,
      { runImmidiatly: true, httpRequestOptions: options },
      RequestRunType.normal
    ).response$;
  }
  delete<T>(url: string, options?: HttpReqeustOptions): Observable<T> {
    return new Request<T>(url, RequestType.delete, {}, this.http,
      { runImmidiatly: true, httpRequestOptions: options },
      RequestRunType.normal
    ).response$;
  }
  put<T>(url: string, body: any, options?: HttpReqeustOptions): Observable<T> {
    return new Request<T>(url, RequestType.put, body, this.http,
      { runImmidiatly: true, httpRequestOptions: options },
      RequestRunType.normal
    ).response$;
  }
  patch<T>(url: string, body: any, options?: HttpReqeustOptions): Observable<T> {
    return new Request<T>(url, RequestType.patch, body, this.http,
      { runImmidiatly: true, httpRequestOptions: options },
      RequestRunType.normal
    ).response$;
  }

  queueGet<T>(url: string, requestRunType: RequestRunType): Observable<T> {
    return this.queue.addRequest<T>(
      new Request<T>(url, RequestType.get, {}, this.http,
        { runImmidiatly: false }, requestRunType
      ),
      requestRunType
    ).response$;
  }

  queuePut<T>(url: string, body: any, requestRunType: RequestRunType): Observable<T> {
    return this.queue.addRequest<T>(
      new Request<T>(url, RequestType.put, body, this.http,
        { runImmidiatly: false }, requestRunType),
      requestRunType
    ).response$;
  }

  queueDelete<T>(url: string, requestRunType: RequestRunType): Observable<T> {
    return this.queue.addRequest<T>(
      new Request<T>(url, RequestType.delete, {}, this.http,
        { runImmidiatly: false }, requestRunType),
      requestRunType
    ).response$;
  }

  queuePost<T>(url: string, body: any, requestRunType: RequestRunType): Observable<T> {
    return this.queue.addRequest<T>(new Request<T>(url, RequestType.post, body, this.http,
      { runImmidiatly: false }, requestRunType),
      requestRunType
    ).response$;
  }

  queuePatch<T>(url: string, body: any, requestRunType: RequestRunType): Observable<T> {
    return this.queue.addRequest<T>(new Request<T>(url, RequestType.patch, body, this.http,
      { runImmidiatly: false }, requestRunType),
      requestRunType
    ).response$;
  }

  startQueue() {
    this.queue.start();
  }
}
