import { NgModule } from '@angular/core';
import { AngularHttpRequestQueueService } from "./angular-http-request-queue.service";
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
  ],
  imports: [
    HttpClientModule
  ],
  exports: [
  ],
  providers: [
    AngularHttpRequestQueueService
  ]
})
export class AngularHttpRequestQueueModule { }
