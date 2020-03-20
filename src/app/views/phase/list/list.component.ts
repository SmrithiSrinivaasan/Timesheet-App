import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';
import { InputModalComponent } from '../../../shared/components/input-modal/input-modal.component';
import { PhaseService } from '../phase.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
})
export class ListComponent implements OnInit {
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
        this.phases = datas;
        this.isPageLoading = false;
      });
  }

  onAdd() {
    const initialState = {
      title: 'Add Phase',
      inputLabel: 'Phase Name',
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

  hasPhase() {
    return this.phases.length > 0;
  }
}
