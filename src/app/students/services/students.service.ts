import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {
  baseURL = 'https://localhost:7171/api/';
  constructor(private http: HttpClient) { 
  }

  studentGetAll(){
    return this.http.get(this.baseURL + 'Student');
  }

  studentGetById(id: number){
    return this.http.get(this.baseURL + 'Student/' + id);
  }

  StudentRegister(body: any){
    return this.http.post(this.baseURL + 'Student/register', body);
  }

  studentUpdate(body: any){
    return this.http.put(this.baseURL + 'Student/update', body);
  }

  studentDelete(id: number){
    return this.http.delete(this.baseURL + 'Student/delete/' + id);
  }

}