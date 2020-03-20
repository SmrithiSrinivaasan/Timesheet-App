import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';
import { InputModalComponent } from '../../../shared/components/input-modal/input-modal.component';

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
    private toast: ToastrService
  ) {}

  ngOnInit(): void {}

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
    // this.bsModalRef.content.save.subscribe((data: string) => {
    //   this.phaseService.addPhase(data).then(
    //     (response: any) => {
    //       this.toast.success('Phase Added Successfully !');
    //       this.bsModalRef.hide();
    //     },
    //     (error: any) => {
    //       this.toast.error(error.message);
    //     }
    //   );
    // });
  }

  hasPhase() {
    return this.phases.length > 0;
  }
}
