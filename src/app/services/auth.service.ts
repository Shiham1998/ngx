import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';


const baseUrl = `${environment.apiUrl}/api/auth/`;

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(user_mobile: string, user_pwd: string): Observable<any> {
    return this.http.post(baseUrl + 'signin', {
      user_mobile,
      user_pwd,
      
    }, httpOptions);
  }

  User(user_first_name: string, user_last_name : string,  user_email: string,user_pwd:string,user_mobile: string,user_address: string,user_type: string): Observable<any> {
    return this.http.post(baseUrl + 'signup', {
      user_first_name,
      user_last_name,
      user_email,
      user_pwd,
      user_mobile,
      user_address,
      user_type
    }, httpOptions);
  }

  updateUser(id: number, params: any) 
  {
     return this.http.put(`${baseUrl}user/update/${id}`, params);
  }

  async getUserList(): Promise<Observable<User[]>> 
  {
    return this.http.get < User[] > (`${baseUrl}userlist`);
  }

  deleteUser(id: string) 
  { 
    return this.http.delete(`${baseUrl}user/delete/${id}`);
  }

}
