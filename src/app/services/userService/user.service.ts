import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { TokenService } from '../tokenService/token.service'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseURL = 'http://localhost:8080';

  private options = {
    headers: {
      "Access-Control-Allow-Origin": '*',
      "Authorization-Token": this.tokenService.getToken() ?? ""
    }
  }

  constructor(private http: HttpClient, private tokenService: TokenService) { }

  getAllUsers() {
    return this.http.get(`${this.baseURL}/users`, this.options);
  }

  getUser(userId: string) {
    return this.http.get(`${this.baseURL}/users/${userId}`, this.options)
  }

  createUser(userData: any) {
    return this.http.post(`${this.baseURL}/users`, userData, this.options);
  }

  updateUser(userId: string, updatedData: any) {
    return this.http.put(`${this.baseURL}/users/${userId}`, updatedData, this.options);
  }

  deleteUser(userId: string) {
    return this.http.delete(`${this.baseURL}/users/${userId}`, this.options);
  }
}
