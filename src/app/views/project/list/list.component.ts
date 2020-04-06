import { Component, OnInit } from '@angular/core';
import { orderBy } from 'lodash';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';
import { DeleteModalComponent } from '../../../shared/components/delete-modal/delete-modal.component';
import { InputModalComponent } from '../../../shared/components/input-modal/input-modal.component';
import { DashboardService } from '../../dashboard/dashboard.service';
import { EntryService } from '../../entry/entry.service';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
})
export class ListComponent implements OnInit {
  projects = [];
  bsModalRef: BsModalRef;
  isPageLoading = false;
  entryKeys = [];

  constructor(
    private modalService: BsModalService,
    private projectService: ProjectService,
    private toast: ToastrService,
    private dashboardService: DashboardService,
    private entryService: EntryService
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
        const orderedProjects = orderBy(datas, 'key', 'desc');
        this.projects = orderedProjects;
        this.isPageLoading = false;
      });
  }

  onAdd() {
    const initialState = {
      title: 'Add Project',
      inputLabel: 'Project Name',
      saveButtonText: 'Save',
      loadingText: 'Saving',
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
          const key = response.key;
          this.dashboardService.addDashboardCount('projects');
          this.dashboardService.addTotalHours(key);
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
      loadingText: 'Updating',
      type: 'Edit',
      initialValue: project.name,
    };
    this.bsModalRef = this.modalService.show(InputModalComponent, {
      initialState,
    });
    this.bsModalRef.content.closeBtnName = 'Close';
    this.entryService
      .getEntryDetails(project.name, 'project')
      .then((snapshot: any) => {
        if (snapshot.val()) {
          this.entryKeys = Object.keys(snapshot.val());
        }
      });

    // communication with input-modal
    this.bsModalRef.content.save.subscribe((data: any) => {
      this.projectService.editProject(project.key, data).then(
        (response: any) => {
          if (this.entryKeys.length > 0) {
            const updatedProjectName = { project: data.name };
            this.entryKeys.map(entryKey => {
              this.entryService.updateEditInEntries(
                entryKey,
                updatedProjectName
              );
            });
            this.closeDialog();
          } else {
            this.closeDialog();
          }
        },
        (error: any) => {
          this.toast.error(error.message);
        }
      );
    });
  }

  closeDialog() {
    this.toast.success('Project Updated Successfully !');
    this.bsModalRef.hide();
  }

  onDelete(project: any) {
    const initialState = {
      title: 'Delete Project',
      saveButtonText: 'Delete',
      message: 'Are you sure you want to delete this project ? ',
    };
    this.bsModalRef = this.modalService.show(DeleteModalComponent, {
      initialState,
    });
    this.bsModalRef.content.closeBtnName = 'Close';

    // communication with input-modal
    this.bsModalRef.content.delete.subscribe((response: boolean) => {
      if (response) {
        this.projectService.deleteProject(project.key).then(
          () => {
            this.dashboardService.removeDashboardCount('projects');
            this.toast.success('Project Deleted Successfully !');
            this.bsModalRef.hide();
          },
          (error: any) => {
            this.toast.error(error.message);
          }
        );
      }
    });
  }

  hasProject() {
    return this.projects.length > 0;
  }
}
