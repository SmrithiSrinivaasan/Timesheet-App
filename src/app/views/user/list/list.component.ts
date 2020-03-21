import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';
import { DeleteModalComponent } from '../../../shared/components/delete-modal/delete-modal.component';
// import { UserService } from '../user.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
})
export class ListComponent implements OnInit {
  users = [];
  bsModalRef: BsModalRef;
  isPageLoading = false;

  constructor(
    private modalService: BsModalService,
    // private userService: UserService,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {}

  onAdd() {}

  onEdit() {}

  onDelete() {}

  hasUser() {
    return this.users.length > 0;
  }
}
