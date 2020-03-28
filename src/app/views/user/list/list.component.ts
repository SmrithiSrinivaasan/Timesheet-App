import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';
import { DeleteModalComponent } from '../../../shared/components/delete-modal/delete-modal.component';
import { DashboardService } from '../../dashboard/dashboard.service';
import { UserService } from '../user.service';

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
    private userService: UserService,
    private toast: ToastrService,
    private router: Router,
    private dashboardService: DashboardService
  ) {}

  ngOnInit(): void {
    this.isPageLoading = true;
    // snapshotChanges is used to update changes without refreshing
    // pipe combines multiple functions
    this.userService
      .getUsers()
      .snapshotChanges()
      .pipe(
        map(changes =>
          changes.map((c: any, index: number) => {
            return {
              id: index + 1,
              key: c.key,
              uid: c.payload.val().uid,
              name: c.payload.val().name,
              email: c.payload.val().email,
            };
          })
        )
      )
      .subscribe(datas => {
        this.users = datas;
        this.isPageLoading = false;
      });
  }

  onAdd() {
    this.router.navigate(['/user/add']);
  }

  onEdit(id: string) {
    this.router.navigate(['/user/edit', id]);
  }

  onDelete(user: any) {
    const initialState = {
      title: 'Delete User',
      saveButtonText: 'Delete',
      message: 'Are you sure you want to delete this user ? ',
    };
    this.bsModalRef = this.modalService.show(DeleteModalComponent, {
      initialState,
    });
    this.bsModalRef.content.closeBtnName = 'Close';

    // communication with input-modal
    this.bsModalRef.content.delete.subscribe((response: boolean) => {
      if (response) {
        this.userService.deleteUser(user.key).then(
          () => {
            this.dashboardService.removeDashboardCount('users');
            this.toast.success('User Deleted Successfully !');
            this.bsModalRef.hide();
          },
          (error: any) => {
            this.toast.error(error.message);
          }
        );
      }
    });
  }

  hasUser() {
    return this.users.length > 0;
  }
}
