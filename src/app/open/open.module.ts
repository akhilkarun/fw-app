import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpenRoutingModule } from './open-routing.module';
import { OpeningComponent } from './opening/opening.component';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule} from '@angular/material/button';
import { MatInputModule } from '@angular/material/input'
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [OpeningComponent],
  imports: [
    CommonModule,
    OpenRoutingModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
    FormsModule,
    MatSnackBarModule
  ]
})
export class OpenModule { }
