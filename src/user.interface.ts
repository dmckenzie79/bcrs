/* ============================================
 ; Title:  user.interface.ts
 ; Author: Jeff Lintel, Zach Dahir, Diandra McKenzie
 ; Date:   19 October 2020
 ; Description: interface defining user properties
 ===========================================*/

 export interface User {
   _id: string;
   userName: string;
   password: string;
   firstName: string;
   lastName: string;
   phoneNumber: string;
   address: string;
   email: string;
 }
