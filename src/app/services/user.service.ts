import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  http = inject(HttpClient); //a estrutura pronta pra fazer requisições

  API = "http://localhost:8080/api/user";
  constructor() { }

  findAll(): Observable<User[]>  {
    return this.http.get<User[]>(this.API);
  }

  findById(id: number): Observable<User>{
    return this.http.get<User>(this.API+"/"+id);
  }

  save(user : User): Observable<string>{
    return this.http.post<string>(this.API, user, {responseType: 'text' as 'json'});
  }
  
  update(user: User): Observable<string>{
    return this.http.put<string>(this.API+"/"+user.id, user, {responseType: 'text' as 'json'});
  }

  delete(id: number): Observable<string>{
    return this.http.delete<string>(this.API+"/"+id, {responseType: 'text' as 'json'});
  }
}
