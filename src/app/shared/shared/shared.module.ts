import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgSelectModule } from '@ng-select/ng-select';
import { ModalModule } from 'ngx-bootstrap/modal';
import { DeleteModalComponent } from '../components/delete-modal/delete-modal.component';
import { InputModalComponent } from '../components/input-modal/input-modal.component';

@NgModule({
  declarations: [InputModalComponent, DeleteModalComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    ModalModule.forRoot(),
    MatProgressSpinnerModule,
    NgSelectModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    NgSelectModule,
  ],
  entryComponents: [InputModalComponent, DeleteModalComponent],
})
export class SharedModule {}
