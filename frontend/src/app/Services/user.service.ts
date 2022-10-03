import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }


  signUp(data: any) {
    return this.httpClient.post(this.url + "/user/signup", data)
  }

  login(data: any) {
    return this.httpClient.post(this.url + "/user/login/", data)
  }

  checkToken() {
    return this.httpClient.get(this.url + "/user/checkToken")
  }
}
