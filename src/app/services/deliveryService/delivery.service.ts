import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http';
import { TokenService } from '../tokenService/token.service';

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {

  private baseURL = 'http://localhost:8080';

  private options = {
    headers: {
      "Access-Control-Allow-Origin": '*',
      "Authorization-Token": this.tokenService.getToken() ?? ""
    }
  }

  constructor(private http: HttpClient, private tokenService: TokenService) { }

  getAllDeliveries() {
    return this.http.get(`${this.baseURL}/deliveries`, this.options);
  }

  getDataResident(deliveryBlock: string, deliveryApartment: string){
    return this.http.get(`${this.baseURL}/deliveries/${deliveryBlock}/${deliveryApartment}`, this.options);
  }

  createDelivery(deliveriesData: any) {
    return this.http.post(`${this.baseURL}/deliveries`, deliveriesData, this.options);
  }

  updateDelivery(deliveryId: string, updatedData: any) {
    return this.http.put(`${this.baseURL}/deliveries/${deliveryId}`, updatedData, this.options);
  }
  
  deleteDelivery(deliveryId: string) {
    return this.http.delete(`${this.baseURL}/deliveries/${deliveryId}`, this.options);
  }
}
