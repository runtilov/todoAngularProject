import {Component, OnDestroy, OnInit} from '@angular/core';
import { Task } from '../../models/task';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ApiTasksService} from '../../services/api-storage/api-tasks.service';
import {Subscription} from 'rxjs';
import {LocalStorageTasksService} from '../../services/local-storage/local-storage-tasks.service';

@Component({
  selector: 'app-todo-page',
  templateUrl: './todo-page.component.html',
  styleUrls: ['./todo-page.component.css']
})
export class TodoPageComponent implements OnInit, OnDestroy {

  finishedTasks: Array<Task> = [];
  unfinishedTasks: Array<Task> = [];
  taskForm: FormGroup;
  submitted: boolean;
  subscriptions: Array<Subscription> = [];

  constructor(
    private taskService: LocalStorageTasksService, private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.taskForm  = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });
     this.subscriptions.push(this.taskService.getFinishedTasks().subscribe( tasks => {
      this.finishedTasks = tasks;
    }));
    this.subscriptions.push(this.taskService.getUnfinishedTasks().subscribe( tasks => {
      this.unfinishedTasks = tasks;
    }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub: Subscription) => {
      sub.unsubscribe();
    });
  }

  get fields() {
    return this.taskForm.controls;
  }

  get tasks(): Array<Task> {
    return [...this.finishedTasks, ...this.unfinishedTasks].reverse();
  }

  addTask(): void {
    this.submitted = true;
    if (this.taskForm.invalid) {
      return;
    }
    this.subscriptions.push(
      this.taskService.addTask(this.taskForm.value.name, this.taskForm.value.description).subscribe(task => {
        this.unfinishedTasks.push(task);
      })
    );
  }
}
