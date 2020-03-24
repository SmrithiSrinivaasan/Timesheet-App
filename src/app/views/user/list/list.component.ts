import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';
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
    private router: Router
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

  onEdit() {}

  onDelete() {}

  hasUser() {
    return this.users.length > 0;
  }
}
