import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { TokenService } from 'src/app/services/tokenService/token.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../model/User';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private tokenService: TokenService,
    private router: Router,
    private jwtHelper: JwtHelperService
  ) {}


  canActivate(): boolean {
    const token = this.tokenService.getToken();

    if (token && !this.jwtHelper.isTokenExpired(token)) {
      const decodedToken = this.jwtHelper.decodeToken(token);

      if (decodedToken?.type === 'RESIDENT') {
        this.router.navigate(['/home-auth']);
        return true;
      } else if (decodedToken?.type === 'ADMIN') {
        this.router.navigate(['/home-admin']);
        return true;
      } else {
        console.error('Tipo de usuário não reconhecido.');
      }
    } else {
      console.error('Token ausente ou expirado.');
    }

    this.router.navigate(['/login']);
    return false;
  }   
}
