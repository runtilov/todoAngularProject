import {TodoPageComponent} from './containers/todo-page/todo-page.component';
import {TodoDetailPageComponent} from './containers/detail-page/todo-detail-page.component';
import {RouterModule, Routes} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: TodoPageComponent
  },
  {
    path: 'todo/:id',
    component: TodoDetailPageComponent
  }
];

export const todoRoutes: ModuleWithProviders = RouterModule.forChild(routes);
