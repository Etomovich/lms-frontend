import { Component, OnInit, Injector, OnDestroy, ViewChild } from '@angular/core';
import { LoansService } from 'src/app/shared/services/loans.service';
import { PaymentService } from 'src/app/shared/services/payment.service';
import { Subject, of } from 'rxjs';
import { takeUntil} from 'rxjs/operators';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { officerData } from 'src/app/shared/models';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  loansService: LoansService;
  paymentService: PaymentService;
  toaster: ToasterService;

  totalLoans: any[] = [];
  loansWithPayments$ = new Subject<any>();

  loanAmountGiven: any[] = [];
  outstandingLoans: any[] = [];
  areas: any[] = [];

  totalLoanAmountGiven: number = 0;
  totalOutstandingLoans: number = 0;
  totalArreas: number = 0;

  //Chart data
  barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  barChartData: any[] = [];
  barChartLabels: any[] = [];
  barChartType = 'bar';
  barChartLegend = true;

  testData = []
  constructor(private injector: Injector) {
    this.loansService = this.injector.get<LoansService>(LoansService);
    this.paymentService = this.injector.get<PaymentService>(PaymentService);
    this.toaster = this.injector.get<ToasterService>(ToasterService);
  }

  ngOnInit() {
    this.test();
    this.getAllLoans();
    this.getTotalLoanAmount();
    this.getOutstandingLoanAmount();
    this.getLoanDue();
    this.populateChart(this.testData);
  }

  getAllLoans() {
    this.totalLoanAmountGiven = 0;
    this.totalOutstandingLoans = 0;
    this.totalArreas = 0;
    this.loansService.getAllLoans().pipe(takeUntil(this.destroy$))
    .subscribe(
      (response: any) =>{
        const { data } = response;
        this.totalLoans = data.map((item) => {
          const payload: any = {
            amountGiven : item.amount_given,
            amountRequested : item.amount_requested,
            dateLoaned : item.date_loaned,
            farmerID: item.farmer_id,
            interestRate : item.interest_rate,
            loanID: item.loan_id,
            loanInfo: item.loan_info,
            loanStatus : item.loan_status,
            payDate : item.pay_date,
            requestTimes: item.request_times
          };
          return payload;
        });
        let payments = [];
        payments = this.totalLoans.map((item) => {
          if (item.loanStatus === 'APPROVED') {
            this.getLoansUnderPayment(item);
          }
        });
      },
      (err: any) => {
        const msg = 'Data not found.';
        console.log("error", err);
        this.toaster.showError(err);
      }
    );
  }

  test(){
    of(officerData).subscribe(
     (response ) => {
       this.testData = officerData;
      },
    );
  }

  getLoansUnderPayment(thisLoan: any) {
    this.paymentService.getPaymentsPerLoan(thisLoan.loanID)
    .pipe(takeUntil(this.destroy$))
    .subscribe(
      (response: any) => {
        const { data } = response;
        let reply = [];
        reply = data.map((item) => {
          const resp = {
            amountPaid : item.amount_paid,
            farmerID : item.farmer_id,
            loanID : item.loan_id,
            payDate : item.pay_date,
            paymentID : item.payment_id,
            paymentInfo : item.payment_info,
            approved : item.approved
          };
          return resp;
        });
        const thisLoanIndex = this.findWithAttr(
          this.totalLoans, 'loanID', thisLoan.loanID
        );
        this.totalLoans[thisLoanIndex]['paymentStatements'] = reply;
        this.loansWithPayments$.next(this.totalLoans);
        return reply;
      },
      (err: any) => {
        console.log(err);
        return false;
      }
    );
  }

  getTotalLoanAmount() {
    this.loansWithPayments$.subscribe(
      (response: any) => {
        const data = response.forEach((item) => {
          if ((item.loanStatus === 'APPROVED') ||
          (item.loanStatus === 'CLOSED')) {
            this.loanAmountGiven.push(item);
            console.log("total array",this.loanAmountGiven);
            this.totalLoanAmountGiven += parseFloat(item.amountGiven);
          }
        });
        console.log("total",this.totalLoanAmountGiven, response);
      },
      (err: any) => {
        console.log("err", err);
      }
    )
  }

  addPayments(data: any[] ): number {
    let counter = 0;
    data.forEach((val) => {
      if('amountPaid' in Object.keys(val)){
        counter += val.amountPaid;
      }
    });
    return counter;
  }

  getDateDiff(date1) {
    const d1 = new Date(date1);
    const today = new Date();
    return (today.getTime() - d1.getTime()) / (1000 * 3600 * 24);
  }

  getExpiry(date1) {
    const d1 = new Date(date1);
    const today = new Date();
    return (d1.getTime() > today.getTime());
  }

  getOutstandingLoanAmount() {
    this.loansWithPayments$.subscribe(
      (response: any) => {
        response.forEach((item) => {
          if ((item.loanStatus === 'APPROVED') &&
          (this.getExpiry(item.payDate))) {
            this.outstandingLoans.push(item);
            const amountToBePayed: number = parseFloat(item.amountGiven);
            let amountPaid = 0;
            if('paymentStatements' in Object.keys(item)){
              amountPaid  = this.addPayments(item.paymentStatements);
            }
            const outstanding = amountToBePayed - amountPaid;

            this.totalOutstandingLoans += outstanding;
          }
        });
        console.log("outstanding",this.totalOutstandingLoans, response);
        console.log("outstanding array",this.totalOutstandingLoans);
      },
      (err: any) => {
        console.log('err', err);
      }
    )
  }

  populateChart(array) {
    const payload = {
      labels: this.stripColumns(array, 'name'),
      barChartData: this.stripColumns(array, 'loanGiven'),
      lineChartData: this.stripColumns(array, 'toBeCollected')
    };
    this.barChartLabels = payload.labels;
    this.barChartData = [
      {data: payload.barChartData, label: 'Loans issued'},
      {data: payload.lineChartData, label: 'Amount yet to be collected', type: 'line'}
    ];
  }

  stripColumns(array: any[], columnName:string){
    const payload = [];
    array.forEach((val) => {
      payload.push(val[columnName]);
    });
    return payload;
  }

  createChart(id, barChatData: any[], lineChatData: any[],
              labels: any[]){
    const mixedChart = new Chart(id, {
      type: 'bar',
      data: {
          datasets: [{
              label: 'Bar Dataset',
              data: barChatData
          }, {
              label: 'Line Dataset',
              data: lineChatData,

              // Changes this dataset to become a line
              type: 'line'
          }],
          labels
      },
      options: {
        legend: {
          display: false,
        },
        tooltips: {
          enabled: true,
        },
      }
    });
  }

  getLoanDue() {
    this.loansWithPayments$.subscribe(
      (response: any) => {
        const data = response.forEach((item) => {
          if ((item.loanStatus === 'APPROVED') &&
          !(this.getExpiry(item.payDate))) {
            this.areas.push(item);
            const amountToBePayed: number = parseFloat(item.amountGiven);
            let amountPaid = 0;
            if('paymentStatements' in Object.keys(item)){
              amountPaid  = this.addPayments(item.paymentStatements);
            }
            const daysElapsed = this.getDateDiff(item.payDate);
            const totalIntrest = (item.interestRate / 100 ) * amountToBePayed * parseInt(`${daysElapsed/30}`);
            const arreas = ( amountToBePayed + totalIntrest) - amountPaid;
            this.totalArreas += arreas;
          }
        });
        console.log("areas",this.totalArreas);
      },
      (err: any) => {
        console.log("err", err);
      }
    )
  }

  findWithAttr(array, attr, value) {
    for (let i = 0; i < array.length; i += 1) {
        if (array[i][attr] === value) {
            return i;
        }
    }
    return -1;
}

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
