import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BsModalRef, ModalModule } from 'ngx-bootstrap/modal';
import { InputModalComponent } from '../../shared/components/input-modal/input-modal.component';
import { ListComponent } from './list/list.component';
import { ProjectRoutingModule } from './project-routing.module';

@NgModule({
  declarations: [ListComponent, InputModalComponent],
  imports: [
    ProjectRoutingModule,
    CommonModule,
    MatButtonModule,
    MatIconModule,
    ModalModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
  ],
  entryComponents: [InputModalComponent],
  providers: [BsModalRef],
})
export class ProjectModule {}
