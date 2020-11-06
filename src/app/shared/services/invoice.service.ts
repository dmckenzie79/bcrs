/* ============================================
 ; Title:  invoice.service.ts
 ; Author: Professor Krasso
 ; Date:   5 November 2020
 ; Modified By: Diandra McKenzie
 ; Description: Invoice Service file
 ===========================================*/

 import { Injectable } from '@angular/core';
 import { HttpClient } from '@angular/common/http';
 import { Invoice } from '../interfaces/invoice.interface';
 import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  constructor(private http: HttpClient) { }

  createInvoice(userName: string, invoice: Invoice): Observable<any> {
    return this.http.post('/api/invoices/' + userName, {
      userName: userName,
      lineItems: invoice.lineItems,
      partsAmount: invoice.partsAmount,
      laborAmount: invoice.laborAmount,
      lineItemTotal: invoice.lineItemTotal,
      total: invoice.total
    })
  }

  findPurchasesByServiceGraph() {
    return this.http.get('/api/invoices/purchases-graph');
  }
}
