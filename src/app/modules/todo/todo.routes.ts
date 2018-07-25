import {TodoPageComponent} from './containers/todo-page/todo-page.component';
import {DetailPageComponent} from './containers/detail-page/detail-page.component';
import {RouterModule, Routes} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: TodoPageComponent
  },
  {
    path: 'todo/:id',
    component: DetailPageComponent
  }
];

export const todoRoutes: ModuleWithProviders = RouterModule.forChild(routes);
