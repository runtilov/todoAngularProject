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

  tasks: Array<Task> = [];
  taskForm: FormGroup;
  submited: boolean;

  constructor(
    private taskService: TasksService, private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.taskForm  = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });
    this.tasks = this.taskService.getTasks();
  }

  get fields() {
    return this.taskForm.controls;
  }

  addTask() {
    this.submited = true;
    if (this.taskForm.invalid) {
      return;
    }
    this.taskService.addTask(this.taskForm.value.name, this.taskForm.value.description);
  }
}
