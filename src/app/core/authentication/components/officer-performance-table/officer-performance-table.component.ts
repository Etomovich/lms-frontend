import {
  Input,
  Component, OnInit
} from '@angular/core';

@Component({
  selector: 'app-officer-performance-table',
  templateUrl: './officer-performance-table.component.html',
  styleUrls: ['./officer-performance-table.component.css']
})
export class OfficerPerformanceTableComponent implements OnInit {
  @Input() tableData: OfficerPerformanceElement[] = [];
  displayedColumns: string[] = [
    'name', 'loanGiven', 'toBeCollected'
  ];

  constructor() { }

  ngOnInit() {
  }

}


export interface OfficerPerformanceElement {
  name: string;
  loanGiven: number;
  toBeCollected: number;
}
