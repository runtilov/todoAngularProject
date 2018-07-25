import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutPageComponent } from './containers/about-page/about-page.component';
import {aboutRoutes} from './about.routes';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    aboutRoutes
  ],
  declarations: [AboutPageComponent]
})
export class AboutModule { }
