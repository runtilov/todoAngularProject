import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoPageComponent } from './containers/todo-page/todo-page.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { DetailPageComponent } from './containers/detail-page/detail-page.component';
import {todoRoutes} from './todo.routes';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    todoRoutes
  ],
  exports: [TodoPageComponent],
  declarations: [TodoPageComponent, DetailPageComponent]
})
export class TodoModule { }
