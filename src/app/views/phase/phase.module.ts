import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BsModalRef, ModalModule } from 'ngx-bootstrap/modal';
import { DeleteModalComponent } from '../../shared/components/delete-modal/delete-modal.component';
import { InputModalComponent } from '../../shared/components/input-modal/input-modal.component';
import { ListComponent } from '../phase/list/list.component';
import { PhaseRoutingModule } from '../phase/phase-routing.module';

@NgModule({
  declarations: [ListComponent, InputModalComponent, DeleteModalComponent],
  imports: [
    PhaseRoutingModule,
    CommonModule,
    MatButtonModule,
    MatIconModule,
    ModalModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
  ],
  entryComponents: [InputModalComponent, DeleteModalComponent],
  providers: [BsModalRef],
})
export class PhaseModule {}
