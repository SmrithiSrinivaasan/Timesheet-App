import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  projects = [];

  constructor() {}

  ngOnInit(): void {}

  onAdd() {}

  hasProject() {
    return this.projects.length > 0;
  }
}
