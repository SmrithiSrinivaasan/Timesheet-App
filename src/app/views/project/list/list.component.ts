import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { InputModalComponent } from '../../../shared/components/input-modal/input-modal.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  projects = [];
  bsModalRef: BsModalRef;
  constructor(private modalService: BsModalService) {}

  ngOnInit(): void {}

  onAdd() {
    const initialState = {
      title: 'Add Project',
      inputLabel: 'Project Name',
      saveButtonText: 'Save'
    };
  this.bsModalRef = this.modalService.show(InputModalComponent, {initialState});
  this.bsModalRef.content.closeBtnName = 'Close';
  // communication with input-modal
  this.bsModalRef.content.save.subscribe((data: string) => {
    this.bsModalRef.hide();
  });
  }

  hasProject() {
    return this.projects.length > 0;
  }
}
