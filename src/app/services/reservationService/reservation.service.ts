import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { TokenService } from '../tokenService/token.service'



@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private baseURL = 'http://localhost:8080'

  private options = {
    headers: {
      "Access-Control-Allow-Origin": '*',
      "Authorization-Token": this.tokenService.getToken() ?? ""
    }
  }

  constructor(private http: HttpClient, private tokenService: TokenService) { }

  getAllReservations() {
    return this.http.get(`${this.baseURL}/reservations`, this.options)
  }

  createReservation(reservationData: any) {
    return this.http.post(`${this.baseURL}/reservations`, reservationData, this.options)
  }

  updateReservation(reservationId: string, updatedData: any) {
    return this.http.put(`${this.baseURL}/reservations/${reservationId}`, updatedData, this.options)
  }

  deleteReservation(reservationId: string) {
    return this.http.delete(`${this.baseURL}/reservations/${reservationId}`, this.options)
  }
}