import { Component, OnInit } from '@angular/core';
import { Task } from '../../models/task';
import {TasksService} from '../../tasks.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-todo-page',
  templateUrl: './todo-page.component.html',
  styleUrls: ['./todo-page.component.css']
})
export class TodoPageComponent implements OnInit {

  finishedTasks: Array<Task>;
  unfinishedTasks: Array<Task>;
  taskForm: FormGroup;
  submitted: boolean;

  constructor(
    private taskService: TasksService, private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.taskForm  = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });
    this.finishedTasks = this.taskService.getFinishedTasks();
    this.unfinishedTasks = this.taskService.getUnfinishedTasks();
  }

  get fields() {
    return this.taskForm.controls;
  }

  get tasks(): Array<Task> {
    return [...this.unfinishedTasks, ...this.finishedTasks].reverse();
  }

  addTask(): void {
    this.submitted = true;
    if (this.taskForm.invalid) {
      return;
    }
    this.taskService.addTask(this.taskForm.value.name, this.taskForm.value.description);
  }
}
