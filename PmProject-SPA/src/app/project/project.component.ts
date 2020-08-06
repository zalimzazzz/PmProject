import { Component, OnInit, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

const templateServiceOrderItem: Procject[] = [
  { id: '1', name: 'Project 1' },
  { id: '2', name: 'Project 2' },
  { id: '3', name: 'Project 3' },
  { id: '4', name: 'Project 4' },
  { id: '5', name: 'Project 5' },
  { id: '6', name: 'Project 6' },
  { id: '7', name: 'Project 7' },
  { id: '8', name: 'Project 8' },
  { id: '9', name: 'Project 9' },
];

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  //displayedColumns: any;
  // dataSource: any;
  // selection: any;
  templateServiceOrderItem = templateServiceOrderItem;
  displayedColumns: string[] = ['select', 'name', 'action'];
  dataSource = new MatTableDataSource<Procject>(templateServiceOrderItem);
  selection = new SelectionModel<Procject>(true, []);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(private router: Router) {
  }

  ngOnInit() {


    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    console.log(this.paginator);
    console.log(this.sort);
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Procject): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    const rowIndex = (element) => element == row.id;
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${this.templateServiceOrderItem.findIndex(rowIndex)}`;
  }

  edit(id: string) {
    console.log(id);
    this.router.navigate(['/project/edit/' + id]);
  }
}


export interface Procject {
  id: string;
  name: string;
}




