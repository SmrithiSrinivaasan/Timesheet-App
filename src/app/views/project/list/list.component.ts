import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { InputModalComponent } from '../../../shared/components/input-modal/input-modal.component';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  projects = ['project'];
  bsModalRef: BsModalRef;
  constructor(
    private modalService: BsModalService,
    private projectService: ProjectService,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {}

  onAdd() {
    const initialState = {
      title: 'Add Project',
      inputLabel: 'Project Name',
      saveButtonText: 'Save',
      type: 'Add',
      initialValue: ''
    };
    this.bsModalRef = this.modalService.show(InputModalComponent, {
      initialState,
    });
    this.bsModalRef.content.closeBtnName = 'Close';

    // communication with input-modal
    this.bsModalRef.content.save.subscribe((data: string) => {
      this.projectService.addProject(data).then(
        (response: any) => {
          console.log('response', response);
          this.toast.success('Project Added Successfully !');
          this.bsModalRef.hide();
        },
        (error: any) => {
          console.log('error', error);
          this.toast.error(error.message);
        }
      );
    });
  }

  onEdit() {
    const initialState = {
      title: 'Edit Project',
      inputLabel: 'Project Name',
      saveButtonText: 'Update',
      type: 'Edit',
      initialValue: 'Project 1'
    };
    this.bsModalRef = this.modalService.show(InputModalComponent, {
      initialState,
    });
    this.bsModalRef.content.closeBtnName = 'Close';

    // communication with input-modal
    this.bsModalRef.content.save.subscribe((data: string) => {
      // this.projectService.addProject(data).then(
      //   (response: any) => {
      //     console.log('response', response);
      //     this.toast.success('Project Updated Successfully !');
      //     this.bsModalRef.hide();
      //   },
      //   (error: any) => {
      //     console.log('error', error);
      //     this.toast.error(error.message);
      //   }
      // );
    });
  }

  onDelete() {

  }

  hasProject() {
    return this.projects.length > 0;
  }
}
