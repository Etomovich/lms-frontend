import {
  Input,
  Component, OnInit
} from '@angular/core';

@Component({
  selector: 'app-officer-table',
  templateUrl: './officer-table.component.html',
  styleUrls: ['./officer-table.component.css']
})
export class OfficerTableComponent implements OnInit {
  @Input() tableData: OfficerElement[] = [];
  displayedColumns: string[] = [
    'username', 'firstName', 'lastName',
    'nationalID', 'role', 'farmers', 'profile'
  ];

  constructor() { }

  ngOnInit() {
  }

}

export interface OfficerElement {
  username: string;
  firstName: string;
  lastName: string;
  nationalID: string;
  role: string;
  farmers: any;
}
