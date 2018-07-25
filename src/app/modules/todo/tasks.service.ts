import {Injectable} from '@angular/core';
import {Task} from './models/task';

@Injectable({
  providedIn: 'root'
})
export class TasksService {


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

  getTasks() {
    return [...this.unfinishedTasks, ...this.finishedTasks];
  }

  getTask(taskId) {
    return this.getTasks().find((task) => task.id === taskId);
  }

  addTask(taskName, taskDescription) {
    const task: Task = {
      id: `${taskName}_${Date.now()}`,
      name: taskName,
      description: taskDescription,
      finished: false,
      finishedAt: null
    };
    this.unfinishedTasks.push(task);
    localStorage.setItem('unfinishedTasks', JSON.stringify(this.unfinishedTasks));
  }

  finishTask(taskId) {
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

  removeTask(taskId) {
    const index = this.finishedTasks.findIndex((task) => task.id === taskId);
    if (index === -1) {
      return;
    }
    this.finishedTasks.splice(index, 1);
    localStorage.setItem('finishedTasks', JSON.stringify(this.finishedTasks));
  }
}
