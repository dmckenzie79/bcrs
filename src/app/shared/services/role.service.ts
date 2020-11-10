/* ============================================
 ; Title:  role.service.ts
 ; Author: Professor Krasso
 ; Date:   5 November 2020
 ; Modified By: Diandra McKenzie
 ; Description: Role Service file
 ===========================================*/

 import { Injectable } from '@angular/core';
 import { Role } from '../interfaces/role.interface';
 import { HttpClient } from '@angular/common/http';
 import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http: HttpClient) { }

  findAllRoles(): Observable<any> {
    return this.http.get('/api/roles');
  }

  findRoleById(roleId: string): Observable<any> {
    return this.http.get('/api/roles/' + roleId);
  }

  createRole(role: Role): Observable<any> {
    return this.http.post('/api/roles/', {
      text: role.text
    });
  }

  updateRole(roleId: string, role: Role): Observable<any> {
    return this.http.put('/api/roles/' + roleId, {
      text: role.text
    });
  }

  deleteRole(roleId: string): Observable<any> {
    return this.http.delete('/api/roles/'+ roleId);
    }

  findUserRole(userName: string): Observable<any> {
    return this.http.get('/api/users/' + userName + '/role');
  }
}
