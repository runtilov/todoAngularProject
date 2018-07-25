import {ContactPageComponent} from './containers/contact-page/contact-page.component';
import {ModuleWithProviders} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: ContactPageComponent
  }
];

export const contactRoutes: ModuleWithProviders = RouterModule.forChild(routes);
