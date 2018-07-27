import {Injectable} from '@angular/core';
import {Task} from '../../models/task';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageTasksService {

  unfinishedTasks: Array<Task> = [];
  finishedTasks: Array<Task> = [];

  constructor() {
    const storedUnfinishedTasks: string = localStorage.getItem('unfinishedTasks');
    if (storedUnfinishedTasks) {
      this.unfinishedTasks = JSON.parse(storedUnfinishedTasks);
    }
    const storedFinishedTasks: string = localStorage.getItem('finishedTasks');
    if (storedFinishedTasks) {
      this.finishedTasks = JSON.parse(storedFinishedTasks);
    }
  }

  getFinishedTasks(): Observable<Array<Task>> {
    return new Observable<Array<Task>>((observer) => {
      observer.next([...this.finishedTasks]);
      observer.complete();
      return {
        unsubscribe() {}
      };
    });
  }
  getUnfinishedTasks(): Observable<Array<Task>> {
    return new Observable<Array<Task>>((observer) => {
      observer.next([...this.unfinishedTasks]);
      observer.complete();
      return {
        unsubscribe() {}
      };
    });
  }

  getTask(taskId: string): Observable<Task> {
    return new Observable<Task>((observer) => {
      observer.next([...this.finishedTasks, ...this.unfinishedTasks].find((task) => task.id === taskId) as Task);
      observer.complete();
      return {
        unsubscribe() {}
      };
    });
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
    this.unfinishedTasks.push(task);
    localStorage.setItem('unfinishedTasks', JSON.stringify(this.unfinishedTasks));
    observer.next(task);
    observer.complete();
    return {
      unsubscribe() {}
    };
  });
  }

  finishTask(taskId: string): Observable<Task> {
    return new Observable<Task>((observer) => {
      const index = this.unfinishedTasks.findIndex((task_it) => task_it.id === taskId);
      if (index === -1) {
        return observer.error(new Error('Task not found in unfinished'));
      }
      const task = this.unfinishedTasks[index];
      this.unfinishedTasks.splice(index, 1);
      localStorage.setItem('unfinishedTasks', JSON.stringify(this.unfinishedTasks));
      task.finished = true;
      task.finishedAt = `${Date.now()}`;
      this.finishedTasks.push(task);
      localStorage.setItem('finishedTasks', JSON.stringify(this.finishedTasks));
      observer.next(task);
      observer.complete();
      return {
        unsubscribe() {}
      };
    });
  }

  removeTask(taskId: string): Observable<any> {
    return new Observable<any>((observer) => {
      const index = this.finishedTasks.findIndex((task) => task.id === taskId);
      if (index === -1) {
        return observer.error(new Error('Task not found in finished'));
      }
      this.finishedTasks.splice(index, 1);
      localStorage.setItem('finishedTasks', JSON.stringify(this.finishedTasks));
      observer.next();
      observer.complete();
      return {
        unsubscribe() {}
      };
    });
  }
}
