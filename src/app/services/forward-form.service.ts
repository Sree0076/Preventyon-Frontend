import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { userDetails } from '../models/users_forward_form.interface';

@Injectable({
  providedIn: 'root'
})
export class ForwardFormService {

  constructor(private http: HttpClient) {}

  getAllUsers():Observable<userDetails[]>{
    return this.http.get<userDetails[]>('https://api.jsonsilo.com/public/af4a4e7a-f439-4c47-b967-00bd7ed71eab');
  }

}
