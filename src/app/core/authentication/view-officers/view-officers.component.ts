import { Component, OnInit, Injector, OnDestroy  } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ToasterService } from 'src/app/shared/services/toaster.service';

@Component({
  selector: 'app-view-officers',
  templateUrl: './view-officers.component.html',
  styleUrls: ['./view-officers.component.css']
})
export class ViewOfficersComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  http: AuthService;
  tableData: any[] = [];
  loading = false;
  toaster: ToasterService;

  constructor(private injector: Injector) {
    this.http = this.injector.get<AuthService>(AuthService);
    this.toaster = this.injector.get<ToasterService>(ToasterService);
  }

  ngOnInit() {
    this.getOfficers();
  }

  getOfficers() {
    this.http.getAllOfficers().pipe(takeUntil(this.destroy$))
    .subscribe(
      (response: any) => {
        const { data } = response;
        this.tableData = data.map((val) => {
          const payload: any = {
            username: val.user_data.username,
            firstName: val.profile_data.first_name,
            lastName: val.profile_data.last_name,
            nationalID: val.profile_data.national_id,
            role: val.user_data.role,
          };
          return payload;
        });
      },
      (err: any) => {
        const msg = 'Data not found.';
        this.toaster.showError(msg);
      },
      () => this.loading = false,
    );

  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
