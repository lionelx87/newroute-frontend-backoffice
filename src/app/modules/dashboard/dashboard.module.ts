import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { ComponentsModule } from './components/components.module';



@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
