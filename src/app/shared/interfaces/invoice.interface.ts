/* ============================================
 ; Title:  invoice.interface.ts
 ; Author: Jeff Lintel, Zach Dahir, Diandra McKenzie
 ; Date:   4 November 2020
 ; Description: invoice interface
 ===========================================*/

 import { LineItem } from './line-item.interface';

 export interface Invoice {
   userName: string;
   lineItems: LineItem[],
   partsAmount: number;
   laborAmount: number,
   lineItemTotal: number;
   total: number;
   orderDate: Date;
 }
