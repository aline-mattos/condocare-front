import { Injectable } from '@angular/core'
import { JwtHelperService } from '@auth0/angular-jwt'


@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private readonly TOKEN_KEY = 'token'
  private jwtHelper = new JwtHelperService()

  constructor() {}

  saveToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token)
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY)
  }

  clearToken(): void {
    localStorage.removeItem(this.TOKEN_KEY)
  }

  getId(): string | null {
    const token = this.getToken();
    if (token) {
      return this.jwtHelper.decodeToken(token)
    }
    return null
  }
}
