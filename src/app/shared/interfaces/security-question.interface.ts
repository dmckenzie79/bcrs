/* ============================================
 ; Title:  security-question.interface.ts
 ; Author: Professor Krasso
 ; Date:   22 October 2020
 ; Modified By: Diandra McKenzie
 ; Description: Security Question Interface
 ===========================================*/

export interface SecurityQuestion {
  _id: string;
  text: string;
  questionText: string;
  answerText: string;
}
