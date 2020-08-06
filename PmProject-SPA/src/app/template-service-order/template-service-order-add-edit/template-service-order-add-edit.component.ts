import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { QuestionAddComponent } from './question-add/question-add.component';

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, question: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, question: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, question: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, question: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, question: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, question: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, question: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, question: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, question: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, question: 'Neon', weight: 20.1797, symbol: 'Ne' },
  { position: 11, question: 'Sodium', weight: 22.9897, symbol: 'Na' },
  { position: 12, question: 'Magnesium', weight: 24.305, symbol: 'Mg' },
  { position: 13, question: 'Aluminum', weight: 26.9815, symbol: 'Al' },
  { position: 14, question: 'Silicon', weight: 28.0855, symbol: 'Si' },
  { position: 15, question: 'Phosphorus', weight: 30.9738, symbol: 'P' },
  { position: 16, question: 'Sulfur', weight: 32.065, symbol: 'S' },
  { position: 17, question: 'Chlorine', weight: 35.453, symbol: 'Cl' },
  { position: 18, question: 'Argon', weight: 39.948, symbol: 'Ar' },
  { position: 19, question: 'Potassium', weight: 39.0983, symbol: 'K' },
  { position: 20, question: 'Calcium', weight: 40.078, symbol: 'Ca' },
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
  position: number;
  weight: number;
  symbol: string;
}

