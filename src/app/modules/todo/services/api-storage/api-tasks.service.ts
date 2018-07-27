import {Injectable} from '@angular/core';
import {Task} from '../../models/task';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiTasksService {
  protected URL = 'http://localhost:3000';

  constructor(protected http: HttpClient) {
  }

  getTask(taskId: string): Observable<Task> {
    return new Observable<Task>(observer => {
      this.http.get(`${this.URL}/finishedTasks/${taskId}`).toPromise()
        .then((finishedTask: Task) => {
          observer.next(finishedTask);
          return observer.complete();
        })
        .catch((error: HttpErrorResponse) => {
          if (error.status !== 404) { throw error; }
          this.http.get(`${this.URL}/unfinishedTasks/${taskId}`).toPromise()
            .then((unfinishedTask: Task) => {
              if (unfinishedTask) {
                observer.next(unfinishedTask);
                return observer.complete();
              }
            });
        });
    });
  }

  getFinishedTasks(): Observable<Array<Task>> {
    return this.http.get(`${this.URL}/finishedTasks`) as Observable<Array<Task>>;
  }

  getUnfinishedTasks(): Observable<Array<Task>> {
    return this.http.get(`${this.URL}/unfinishedTasks`) as Observable<Array<Task>>;
  }

  addTask(taskName: string, taskDescription: string): Observable<Task> {
    return new Observable<Task>((observer) => {
      const task: Task = {
        id: `${Date.now()}_${taskName}`,
        name: taskName,
        description: taskDescription,
        finished: false,
        finishedAt: null
      };
      this.http.post(`${this.URL}/unfinishedTasks`, task).toPromise();
      observer.next(task);
      observer.complete();
      return {
        unsubscribe() {}
      };
    });
  }

  finishTask(taskId: string): Observable<Task> {
    return new Observable<Task>(observer => {
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
      return {
        unsubscribe() {}
      };
    });
  }

  removeTask(taskId: string): Observable<any> {
    return this.http.delete(`${this.URL}/finishedTasks/${taskId}`);
  }
}
