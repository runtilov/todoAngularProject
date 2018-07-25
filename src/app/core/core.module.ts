import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HeaderComponent } from './components/header/header.component';
import { LayoutComponent } from './components/layout/layout.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule } from '@angular/router';

const COMPONENTS = [NavbarComponent, HeaderComponent, LayoutComponent, FooterComponent];

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [...COMPONENTS],
  declarations: [...COMPONENTS]
})
export class CoreModule { }
