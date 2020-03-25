import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
})
export class ListComponent implements OnInit {
  isPageLoading = false;
  entries = [];

  constructor() {}

  ngOnInit(): void {}

  hasEntries() {
    return this.entries.length > 0;
  }

  onAdd() {}

  onEdit() {}
}
