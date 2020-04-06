import { Component, OnInit } from '@angular/core';
import { orderBy } from 'lodash';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';
import { DeleteModalComponent } from '../../../shared/components/delete-modal/delete-modal.component';
import { InputModalComponent } from '../../../shared/components/input-modal/input-modal.component';
import { PhaseService } from '../phase.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
})
export class ListComponent implements OnInit {
  isLoading = false;

  phases = [];
  bsModalRef: BsModalRef;
  isPageLoading = false;

  constructor(
    private modalService: BsModalService,
    private toast: ToastrService,
    private phaseService: PhaseService
  ) {}

  ngOnInit(): void {
    this.isPageLoading = true;
    // snapshotChanges is used to update changes without refreshing
    // pipe combines multiple functions
    this.phaseService
      .getPhases()
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
        const orderedPhases = orderBy(datas, 'key', 'desc');
        this.phases = orderedPhases;
        this.isPageLoading = false;
      });
  }

  onAdd() {
    const initialState = {
      title: 'Add Phase',
      inputLabel: 'Phase Name',
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
      this.phaseService.addPhase(data).then(
        (response: any) => {
          this.toast.success('Phase Added Successfully !');
          this.bsModalRef.hide();
        },
        (error: any) => {
          this.toast.error(error.message);
        }
      );
    });
  }

  onEdit(phase: any) {
    const initialState = {
      title: 'Edit Phase',
      inputLabel: 'Phase Name',
      saveButtonText: 'Update',
      loadingText: 'Updating',
      type: 'Edit',
      initialValue: phase.name,
    };
    this.bsModalRef = this.modalService.show(InputModalComponent, {
      initialState,
    });
    this.bsModalRef.content.closeBtnName = 'Close';

    // communication with input-modal
    this.bsModalRef.content.save.subscribe((data: string) => {
      this.phaseService.editPhase(phase.key, data).then(
        (response: any) => {
          this.toast.success('Phase Updated Successfully !');
          this.bsModalRef.hide();
        },
        (error: any) => {
          this.toast.error(error.message);
        }
      );
    });
  }

  onDelete(phase: any) {
    const initialState = {
      title: 'Delete Phase',
      saveButtonText: 'Delete',
      message: 'Are you sure you want to delete this phase ? ',
    };
    this.bsModalRef = this.modalService.show(DeleteModalComponent, {
      initialState,
    });
    this.bsModalRef.content.closeBtnName = 'Close';

    // communication with input-modal
    this.bsModalRef.content.delete.subscribe((response: boolean) => {
      if (response) {
        this.phaseService.deletePhase(phase.key).then(
          () => {
            this.toast.success('Phase Deleted Successfully !');
            this.bsModalRef.hide();
          },
          (error: any) => {
            this.toast.error(error.message);
          }
        );
      }
    });
  }

  hasPhase() {
    return this.phases.length > 0;
  }
}
