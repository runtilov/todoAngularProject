import {RouterModule, Routes} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {TodoPageComponent} from './modules/todo/containers/todo-page/todo-page.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'todo',
    pathMatch: 'full'
  },
  {
    path: 'todo',
    component: TodoPageComponent
  },
  {
    path: 'contact',
    loadChildren: './modules/contact/contact.module#ContactModule'
  },
  {
    path: 'about',
    loadChildren: './modules/about/about.module#AboutModule'
  }
];

export const appRoutes: ModuleWithProviders = RouterModule.forRoot(routes);
