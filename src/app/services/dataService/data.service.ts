import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TokenService } from '../tokenService/token.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private baseURL = 'http://localhost:8080';

  private options = {
    headers: {
      "Access-Control-Allow-Origin": '*',
      "Authorization-Token": this.tokenService.getToken() ?? ""
    }
  }

  constructor(private http: HttpClient, private tokenService: TokenService) { }

  getAllServices() {
    return this.http.get(`${this.baseURL}/services`, this.options);
  }

  getServiceByType(serviceType: string) {
    return this.http.get(`${this.baseURL}/services_type/${serviceType}`, this.options)
  }

  createService(serviceData: any) {
    return this.http.post(`${this.baseURL}/services`, serviceData, this.options);
  }

  updateService(serviceId: string, updatedData: any) {
    return this.http.put(`${this.baseURL}/services/${serviceId}`, updatedData, this.options);
  }

  deleteService(serviceId: string) {
    return this.http.delete(`${this.baseURL}/services/${serviceId}`, this.options);
  }
}