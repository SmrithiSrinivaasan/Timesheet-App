import { Component, OnInit } from '@angular/core';
// import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';
import { DeleteModalComponent } from '../../../shared/components/delete-modal/delete-modal.component';

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
    private toast: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onAdd() {
    this.router.navigate(['/user/add']);
  }

  onEdit() {}

  onDelete() {}

  hasUser() {
    return this.users.length > 0;
  }
}
