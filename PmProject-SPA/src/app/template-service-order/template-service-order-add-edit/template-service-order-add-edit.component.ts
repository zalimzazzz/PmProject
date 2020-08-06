import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { QuestionAddComponent } from './question-add/question-add.component';

const ELEMENT_DATA: PeriodicElement[] = [
  { id: 1, question: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { id: 2, question: 'Helium', weight: 4.0026, symbol: 'He' },
  { id: 3, question: 'Lithium', weight: 6.941, symbol: 'Li' },
  { id: 4, question: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { id: 5, question: 'Boron', weight: 10.811, symbol: 'B' },
  { id: 6, question: 'Carbon', weight: 12.0107, symbol: 'C' },
  { id: 7, question: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { id: 8, question: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { id: 9, question: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { id: 10, question: 'Neon', weight: 20.1797, symbol: 'Ne' },
  { id: 11, question: 'Sodium', weight: 22.9897, symbol: 'Na' },
  { id: 12, question: 'Magnesium', weight: 24.305, symbol: 'Mg' },
  { id: 13, question: 'Aluminum', weight: 26.9815, symbol: 'Al' },
  { id: 14, question: 'Silicon', weight: 28.0855, symbol: 'Si' },
  { id: 15, question: 'Phosphorus', weight: 30.9738, symbol: 'P' },
  { id: 16, question: 'Sulfur', weight: 32.065, symbol: 'S' },
  { id: 17, question: 'Chlorine', weight: 35.453, symbol: 'Cl' },
  { id: 18, question: 'Argon', weight: 39.948, symbol: 'Ar' },
  { id: 19, question: 'Potassium', weight: 39.0983, symbol: 'K' },
  { id: 20, question: 'Calcium', weight: 40.078, symbol: 'Ca' },
];
@Component({
  selector: 'app-template-service-order-add-edit',
  templateUrl: './template-service-order-add-edit.component.html',
  styleUrls: ['./template-service-order-add-edit.component.scss']
})
export class TemplateServiceOrderAddEditComponent implements OnInit {

  displayedColumns: string[] = ['question', 'action'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(public dialog: MatDialog) {

  }
  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }

  openDialog() {
    this.dialog.open(QuestionAddComponent, {
      data: {
        animal: 'panda'
      }
    });
  }


}

export interface PeriodicElement {
  question: string;
  id: number;
  weight: number;
  symbol: string;
}

