/* ============================================
 ; Title:  user.service.ts
 ; Author: Jeff Lintel, Zach Dahir, Diandra McKenzie
 ; Date:   23 October 2020
 ; Description: user service
 ===========================================*/

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './../../src/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }


  //find all users
  findAllUsers(): Observable<any> {
    return this.http.get('/api/users/');
  }

  //find a user by id
  findUserById(userId: string): Observable<any> {
    return this.http.get('/api/users/' + userId);
  }

  //create a user
  createUser(user: User): Observable<any> {
    return this.http.post('/api/users', {
      userName: user.userName,
      password: user.password,
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      address: user.address,
      email: user.email
    });
  }

  //update a user
  updateUser(userId: string, user: User): Observable<any> {
    return this.http.put('/api/users/'+ userId, {
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      address: user.address,
      email: user.email
    });
  }

  //delete a user
  deleteUser(userId: string): Observable<any> {
    return this.http.delete('/api/users' + userId)
  }
}
