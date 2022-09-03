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
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

import { SpotsListComponent } from './spots-list/spots-list.component';
import { SpotModalComponent } from './spot-modal/spot-modal.component';



@NgModule({
  declarations: [
    HeaderComponent,
    SpotsListComponent,
    SpotModalComponent
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
    MatDialogModule,
    MatDividerModule,
    SweetAlert2Module.forRoot(),
    MatFormFieldModule,
    MatSelectModule
  ],
  exports: [
    HeaderComponent,
    SpotsListComponent
  ]
})
export class ComponentsModule { }
