import {Component, OnDestroy, OnInit} from '@angular/core';
import {SubscriptionService} from "../../services/subscription/subscription.service";
import {SubConfig} from "../../interfaces/subscription/SubConfig";
import * as moment from "moment";
import {SnackbarService} from "../../../../shared/services/snackbar/snackbar.service";
import {PaymentsService} from "../../services/payments/payments.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss']
})
export class SubscriptionComponent implements OnInit, OnDestroy {
  subs: SubConfig[] = []
  serverLoadSubs: boolean = false;
  serverLoadAddSubPayment: boolean = false;
  loadAllPayments: Subscription

  constructor(private subService: SubscriptionService,
              private snackBar: SnackbarService,
              private paymentService: PaymentsService) {
    this.loadAllPayments = this.paymentService.loadPayments().subscribe()
  }

  ngOnInit(): void {
    this.getAllSubs()
  }

  ngOnDestroy() {
    this.loadAllPayments.unsubscribe()
  }


  getAllSubs(): void {
    this.serverLoadSubs = true
    this.subService.getAllSubs().subscribe(subs => {
      this.serverLoadSubs = false;
      if (subs)
        this.subs = subs
      /* Custom time format */
      if (subs)
        subs.forEach(sub => {
          sub.subStart = moment(sub.subStart).format('MMMM D')
          sub.subEnd = moment(sub.subEnd).format('MMMM D')
        })
    })
  }

  addToPayments(subType: string, subName: string): void {
    this.serverLoadAddSubPayment = true
    this.subService.addSubToPayments(subType, subName).subscribe(async response => {
      this.loadAllPayments = await this.paymentService.loadPayments().subscribe()
      this.serverLoadAddSubPayment = false;
      if (response.msg)
        this.snackBar.openSnackBar(response.msg, false, 5)
    }, error => {
      this.serverLoadAddSubPayment = false;
      if (error.error.msg)
        this.snackBar.openSnackBar(error.error.msg, true, 5)
    })
  }

}
