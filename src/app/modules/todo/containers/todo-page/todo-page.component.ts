import { Component, OnInit } from '@angular/core';
import { Task } from '../../models/task';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ApiTasksService} from '../../services/api-storage/api-tasks.service';

@Component({
  selector: 'app-todo-page',
  templateUrl: './todo-page.component.html',
  styleUrls: ['./todo-page.component.css']
})
export class TodoPageComponent implements OnInit {

  finishedTasks: Array<Task> = [];
  unfinishedTasks: Array<Task> = [];
  taskForm: FormGroup;
  submitted: boolean;

  constructor(
    private taskService: ApiTasksService, private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.taskForm  = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });
    this.taskService.getFinishedTasks().subscribe( tasks => {
      this.finishedTasks = tasks;
    });
    this.taskService.getUnfinishedTasks().subscribe( tasks => {
      this.unfinishedTasks = tasks;
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
    const task = this.taskService.addTask(this.taskForm.value.name, this.taskForm.value.description);
    this.unfinishedTasks.push(task);
  }
}
