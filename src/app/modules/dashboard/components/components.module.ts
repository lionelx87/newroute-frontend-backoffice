import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';

import { SpotsListComponent } from './spots-list/spots-list.component';



@NgModule({
  declarations: [
    HeaderComponent,
    SpotsListComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    MatCardModule,
    MatInputModule,
    MatTableModule,
    MatFormFieldModule
  ],
  exports: [
    HeaderComponent,
    SpotsListComponent
  ]
})
export class ComponentsModule { }
