/* ============================================
 ; Title:  home.component.ts
 ; Author: Zach Dahir, Jeff Lintel, Diandra McKenzie
 ; Date:   19 October 2020
 ; Description: home component
 ===========================================*/

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServiceRepairItem } from '../../shared/interfaces/service-repair-item.interface';
import { Invoice } from '../../shared/interfaces/invoice.interface';
import { LineItem } from '../../shared/interfaces/line-item.interface';
import { InvoiceService } from '../../shared/services/invoice.service';
import { ServiceRepairService } from '../../shared/services/service-repair.service';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { MatDialog } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Router } from '@angular/router';
import { InvoiceSummaryDialogComponent } from 'src/app/dialog/invoice-summary-dialog/invoice-summary-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  form: FormGroup;
  userName: string;
  services: ServiceRepairItem[];
  lineItems: LineItem[];
  //message: string;

  constructor(private http: HttpClient, private cookieService: CookieService, private fb: FormBuilder, private dialog: MatDialog, private router: Router,
              private serviceRepairService: ServiceRepairService, private invoiceService: InvoiceService) {
                //get username
                this.userName = this.cookieService.get('session_user');
                //get repair items
                this.services = this.serviceRepairService.getServiceRepairItems();
              }

  ngOnInit(): void {
    this.form = this.fb.group({
      parts: [null, Validators.compose([Validators.required])],
      labor: [null, Validators.compose([Validators.required])]
    });
  }

  submit(form) {
    console.log(form)
    const selectedServiceIds = [];
    for(const [key, value] of Object.entries(form.checkGroup)) {
      if(value) {
        selectedServiceIds.push({
          id: key
        });
      }
    }
    this.lineItems = [];

    //build invoice object
    for (const savedService of this.services) {
      for(const selectedService of selectedServiceIds) {
        if(savedService.id === selectedService.id) {
          this.lineItems.push({
            title: savedService.title,
            price: savedService.price
          });
        }
      }
    }

    console.log(this.lineItems);

    const partsAmount = parseFloat(form.parts);
    const laborAmount = form.labor * 50;
    const lineItemTotal = this.lineItems.reduce((prev, cur) => prev + cur.price, 0);
    const total = partsAmount + laborAmount + lineItemTotal;

    const invoice = {
      userName:  this.userName,
      lineItems: this.lineItems,
      partsAmount: partsAmount,
      laborAmount: laborAmount,
      lineItemTotal: lineItemTotal,
      total: total,
      orderDate: new Date()
    } as Invoice;

    console.log(invoice);

    const dialogRef = this.dialog.open(InvoiceSummaryDialogComponent, {
      data: {
        invoice: invoice
      },
      disableClose: true,
      width: '720px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        console.log('Invoice saved');
        //this.message = "Invoice saved"

        this.invoiceService.createInvoice(invoice.userName, invoice).subscribe(res => {
          this.router.navigate(['/']);
        }, err => {
          console.log(err);
        });
      }
    });
  }

}
