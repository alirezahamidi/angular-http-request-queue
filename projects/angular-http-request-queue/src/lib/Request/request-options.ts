import { HttpReqeustOptions } from "./http-request-options";
export interface RequestOptions {
  runImmidiatly: boolean;
  httpRequestOptions?: HttpReqeustOptions
}
