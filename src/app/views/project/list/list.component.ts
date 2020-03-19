import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';
import { InputModalComponent } from '../../../shared/components/input-modal/input-modal.component';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  projects = [];
  bsModalRef: BsModalRef;
  isPageLoading = false;

  constructor(
    private modalService: BsModalService,
    private projectService: ProjectService,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {
    this.isPageLoading = true;
    // snapshotChanges is used to update changes without refreshing
    // pipe combines multiple functions
    this.projectService
      .getProjects()
      .snapshotChanges()
      .pipe(
        map(changes =>
          changes.map((c: any, index: number) => {
            return {
              id: index + 1,
              key: c.key,
              name: c.payload.val().name,
            };
          })
        )
      )
      .subscribe(datas => {
        this.projects = datas;
        this.isPageLoading = false;
      });
  }

  onAdd() {
    const initialState = {
      title: 'Add Project',
      inputLabel: 'Project Name',
      saveButtonText: 'Save',
      type: 'Add',
      initialValue: '',
    };
    this.bsModalRef = this.modalService.show(InputModalComponent, {
      initialState,
    });
    this.bsModalRef.content.closeBtnName = 'Close';

    // communication with input-modal
    this.bsModalRef.content.save.subscribe((data: string) => {
      this.projectService.addProject(data).then(
        (response: any) => {
          this.toast.success('Project Added Successfully !');
          this.bsModalRef.hide();
        },
        (error: any) => {
          this.toast.error(error.message);
        }
      );
    });
  }

  onEdit(project: any) {
    const initialState = {
      title: 'Edit Project',
      inputLabel: 'Project Name',
      saveButtonText: 'Update',
      type: 'Edit',
      initialValue: project.name,
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

  onDelete() {}

  hasProject() {
    return this.projects.length > 0;
  }
}
