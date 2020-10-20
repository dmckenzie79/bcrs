/* ============================================
 ; Title:  base-layout.component.ts
 ; Author: Zach Dahir, Jeff Lintel, Diandra McKenzie
 ; Date:   19 October 2020
 ; Description: base layout component
 ===========================================*/

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-base-layout',
  templateUrl: './base-layout.component.html',
  styleUrls: ['./base-layout.component.css']
})
export class BaseLayoutComponent implements OnInit {

  year: number = Date.now();

  constructor() { }

  ngOnInit(): void {
  }

}
