import {Injectable} from '@angular/core';
import {Task} from '../../models/task';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiTasksService {
  protected URL = 'http://localhost:3000';

  constructor(protected http: HttpClient) {
  }

  getTasks(): Observable<Array<Task>> {
    return new Observable<Array<Task>>(observer => {
      const result: Array<Task> = [];
      this._request('GET', `finishedTasks`).subscribe(finishedTasks => {
        if (finishedTasks) {
          result.push(...finishedTasks);
        }
        this._request('GET', `unfinishedTasks`).subscribe(unfinishedTasks => {
          if (unfinishedTasks) {
            result.push(...unfinishedTasks);
          }
          observer.next(result);
          observer.complete();
        });
      });
    });
  }

  getTask(taskId: string): Observable<Task> {
    return new Observable<Task>(observer => {
      this._request('GET', `finishedTasks/${taskId}`).subscribe(finishedTask => {
        if (finishedTask) {
          observer.next(finishedTask);
          return observer.complete();
        }
      }, error => {
        if (error) {
          this._request('GET', `unfinishedTasks/${taskId}`).subscribe(unfinishedTask => {
            if (unfinishedTask) {
              observer.next(unfinishedTask);
              return observer.complete();
            }
          });
        }
      });
    });
  }

  getFinishedTasks(): Observable<any> {
    return this.http.get(`${this.URL}/finishedTasks`);
  }

  getUnfinishedTasks(): Observable<any> {
    return this.http.get(`${this.URL}/unfinishedTasks`);
  }

  addTask(taskName: string, taskDescription: string): Task {
    const task: Task = {
      id: `${Date.now()}_${taskName}`,
      name: taskName,
      description: taskDescription,
      finished: false,
      finishedAt: null
    };
    this.http.post(`${this.URL}/unfinishedTasks`, task).subscribe(console.log);
    return task;
  }

  finishTask(taskId: string): Observable<Task> {
    return new Observable(observer => {
      this.getTask(taskId).toPromise()
        .then(task => {
          if (task.finished) {
            return;
          }
          task.finished = true;
          task.finishedAt = `${Date.now()}`;
          observer.next(task);
          return this.http.post(`${this.URL}/finishedTasks`, task).toPromise();
        })
        .then(() => {
          return this.http.delete(`${this.URL}/unfinishedTasks/${taskId}`).toPromise();
        })
        .then(() => {
          observer.complete();
        });
    });
  }

  removeTask(taskId: string): Observable<Task> {
    return this.http.delete(`${this.URL}/finishedTasks/${taskId}`) as Observable<Task>;
  }

  private _request(method: string, path: string, body?: string, options?: any): Observable<any> {
    if (!options) {
      options = {};
    }

    const url = `${this.URL}/${path}`;
    const params = options.params && this.getParams(options.params);

    const optionsToSend = Object.assign(options, {
      url,
      body,
      params
    });

    return Observable.create((observer) => {
      return this.http.request(method, url, optionsToSend).subscribe(
        (res) => {
          observer.next(res);
          observer.complete();
        },
        (err: HttpErrorResponse) => {
          if (err.status === 401 || err.status === 403) {
            console.log('Refresh token needed!');
          }

          console.log('err');

          observer.error(err);
        });
    });
  }

  private getParams(params?: any): HttpParams {
    let paramsToSend: HttpParams = new HttpParams();

    if (params) {
      for (const [key, value] of Object.entries(params)) {
        paramsToSend = paramsToSend.append(key, value as string);
      }
    }

    return paramsToSend;
  }
}
