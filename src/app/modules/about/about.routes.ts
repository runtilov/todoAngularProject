import {AboutPageComponent} from './containers/about-page/about-page.component';
import {RouterModule, Routes} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: AboutPageComponent
  }
];

export const aboutRoutes: ModuleWithProviders = RouterModule.forChild(routes);
