import { Subject } from 'rxjs';
import { Category } from '../Category';
import { Request, RequestRunType } from '../Request';

export class Queue {
  categories: Category[];
  private runCount = 0;
  private doneCount = 0;
  private onGoingProgress = false;

  private progress = new Subject();

  constructor() {
    this.categories = [];
    this.categories.push(new Category('normal'));
    this.categories.push(new Category('background'));
    this.progress.subscribe((x) => {
      this.runRequests();
    });
  }

  addRequest<T>(request: Request<T>, requestRunType: RequestRunType) {
    switch (requestRunType) {
      case RequestRunType.normal:
        return this.categories
          .filter((x) => x.uuid == 'normal')[0]
          .addRequest(request);
        break;
      case RequestRunType.background:
        return this.categories
          .filter((x) => x.uuid == 'background')[0]
          .addRequest(request);
        break;
    }
  }

  start() {
    this.progress.next();
  }

  runRequests() {
    if (this.doneCount >= this.runCount) {
      this.onGoingProgress = false;
    }
    if (this.onGoingProgress) return;
    this.onGoingProgress = true;

    this.categories.forEach((x) => {
      x.removeInAccessibleRequests();
    });

    if (
      this.categories
        .filter((x) => x.uuid == 'normal')[0]
        .requests.filter((x) => x.accessible).length > 0
    ) {
      this.categories
        .filter((x) => x.uuid == 'normal')[0]
        .requests.forEach((x) => {
          if (x.accessible) {
            this.runCount += 1;
            let t = x.requestStatus$.subscribe((y) => {
              if (y == 'success' || y == 'error') {
                this.doneCount += 1;
                if (this.runCount <= this.doneCount) this.progress.next();
                t.unsubscribe();
              }
            });
            x.start();
          }
        });

      return;
    } else if (
      this.categories
        .filter((x) => x.uuid == 'background')[0]
        .requests.filter((x) => x.accessible).length > 0
    ) {
      this.categories
        .filter((x) => x.uuid == 'background')[0]
        .requests.forEach((x) => {
          if (x.accessible) {
            this.runCount += 1;
            let t = x.requestStatus$.subscribe((y) => {
              if (y == 'success' || y == 'error') {
                this.doneCount += 1;
                if (this.runCount <= this.doneCount) this.progress.next();
                t.unsubscribe();
              }
            });
            x.start();
          }
        });
      return;
    } else {
      this.onGoingProgress = false;
      return;
    }
  }
}
