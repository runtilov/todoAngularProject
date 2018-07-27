import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoPageComponent } from './containers/todo-page/todo-page.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { TodoDetailPageComponent } from './containers/detail-page/todo-detail-page.component';
import {todoRoutes} from './todo.routes';
import {RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    todoRoutes,
  ],
  exports: [TodoPageComponent],
  declarations: [TodoPageComponent, TodoDetailPageComponent]
})
export class TodoModule { }
