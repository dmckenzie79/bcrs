/* ============================================
 ; Title:  user.interface.ts
 ; Author: Professor Krasso
 ; Date:   22 October 2020
 ; Modified By: Diandra McKenzie
 ; Description: User Interface
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
   role: string;
 }
