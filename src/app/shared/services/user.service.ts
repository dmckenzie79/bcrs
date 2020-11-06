/* ============================================
 ; Title:  user.service.ts
 ; Author: Professor Krasso
 ; Date:   22 October 2020
 ; Modified By: Diandra McKenzie
 ; Description: User Service file
 ===========================================*/

import { Injectable } from '@angular/core';
import { User } from '../interfaces/user.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  findAllUsers(): Observable<any> {
    return this.http.get('/api/users');

  }

  findUserById(userId: string): Observable<any> {
    return this.http.get('/api/users/'+ userId);
  }

  createUser(user: User): Observable<any> {
    return this.http.post('/api/users', {
      userName: user.userName,
      password: user.password,
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      address: user.address,
      email: user.email

    })
  }

  updateUser(userId: string, user: User): Observable<any> {
    return this.http.put('/api/users/'+ userId, {
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      address: user.address,
      email: user.email,
      role: user.role
    })
  }

  deleteUser(userId: string): Observable<any> {
    return this.http.delete('/api/users/' + userId);
  }
}
