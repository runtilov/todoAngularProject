import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactPageComponent } from './containers/contact-page/contact-page.component';
import { contactRoutes } from './contact.routes';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    contactRoutes
  ],
  declarations: [ContactPageComponent]
})
export class ContactModule { }
