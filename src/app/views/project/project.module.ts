import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { ListComponent } from './list/list.component';
import { ProjectRoutingModule } from './project-routing.module';

@NgModule({
  declarations: [ListComponent],
  imports: [
    ProjectRoutingModule,
    CommonModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class ProjectModule { }
