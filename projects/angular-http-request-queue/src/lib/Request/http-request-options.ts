import { HttpHeaders, HttpParams } from "@angular/common/http";

export interface HttpReqeustOptions {
    headers?: HttpHeaders | {
        [header: string]: string | string[];
    };
    params?: HttpParams | { [param: string]: string | string[]; };
    reportProgress?: boolean;
    responseType?: string;
    withCredentials?: boolean;
    observe?: string;
}