import {Injectable} from '@angular/core';
import {Task} from '../../models/task';

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

  getTasks(): Array<Task> {
    return [...this.unfinishedTasks, ...this.finishedTasks];
  }

  getFinishedTasks(): Array<Task> {
    return this.finishedTasks;
  }

  getUnfinishedTasks(): Array<Task> {
    return this.unfinishedTasks;
  }

  getTask(taskId: string): Task {
    return (this.getTasks().find((task) => task.id === taskId) as Task);
  }

  addTask(taskName: string, taskDescription: string): void {
    const task: Task = {
      id: `${Date.now()}_${taskName}`,
      name: taskName,
      description: taskDescription,
      finished: false,
      finishedAt: null
    };
    this.unfinishedTasks.push(task);
    localStorage.setItem('unfinishedTasks', JSON.stringify(this.unfinishedTasks));
  }

  finishTask(taskId: string): void {
    const index = this.unfinishedTasks.findIndex((task_it) => task_it.id === taskId);
    if (index === -1) {
      return;
    }
    const task = this.unfinishedTasks[index];
    this.unfinishedTasks.splice(index, 1);
    localStorage.setItem('unfinishedTasks', JSON.stringify(this.unfinishedTasks));
    task.finished = true;
    task.finishedAt = `${Date.now()}`;
    this.finishedTasks.push(task);
    localStorage.setItem('finishedTasks', JSON.stringify(this.finishedTasks));
  }

  removeTask(taskId: string) {
    const index = this.finishedTasks.findIndex((task) => task.id === taskId);
    if (index === -1) {
      return;
    }
    this.finishedTasks.splice(index, 1);
    localStorage.setItem('finishedTasks', JSON.stringify(this.finishedTasks));
  }
}
