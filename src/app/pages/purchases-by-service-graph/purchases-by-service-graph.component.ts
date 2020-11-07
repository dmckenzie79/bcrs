/* ============================================
 ; Title:  purchases-by-service-graph.component.ts
 ; Author: Professor Krasso
 ; Date:   6 November 2020
 ; Modified By: Diandra McKenzie, Jeff Lintel, Zach Dahir
 ; Description: component to display a graph of purchases by service
 ===========================================*/

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InvoiceService } from '../../shared/services/invoice.service';

@Component({
  selector: 'app-purchases-by-service-graph',
  templateUrl: './purchases-by-service-graph.component.html',
  styleUrls: ['./purchases-by-service-graph.component.css']
})
export class PurchasesByServiceGraphComponent implements OnInit {

  purchases: any;
  data: any;
  itemCount = [];
  labels = [];

  constructor(private http: HttpClient, private invoiceService: InvoiceService) {
    //call purchases by service API
    this.invoiceService.findPurchasesByServiceGraph().subscribe(res => {
      //map response data to purchases var
      this.purchases = res['data']

      //loop over purchases to get services and item count
      for (const item of this.purchases) {
        this.labels.push(item._id.title);
        this.itemCount.push(item.count);
      }

      //build object literal required for primeNG graph
      this.data =
      {
        labels: this.labels, //labels for services
        datasets: [
          {
            backgroundColor: [
              '#80DEEA',
              '#81BAEB',
              '##8196EB',
              '#9081EB',
              '#81EBD3',
              '#81EBAF',
              '#8AEB81'
            ],
            hoverBackgroundColor: [
              '#80DEEA',
              '#81BAEB',
              '##8196EB',
              '#9081EB',
              '#81EBD3',
              '#81EBAF',
              '#8AEB81'
            ],
            data: this.itemCount
          }
        ]
    };

    //confirm data object structure is what primeNG expects
    console.log(`
      -----Data Object-----
      ${this.data}
    `);


    }
  )}

  ngOnInit() {
    
  }
}


