import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { TokenService } from 'src/app/services/tokenService/token.service'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private router: Router, private tokenService: TokenService){}
  isAuthenticated = false

  ngOnInit(): void {
    this.checkAuthentication();
  }

  checkAuthentication(): void {
    // Verifica se o token está presente para determinar se o usuário está autenticado
    this.isAuthenticated = this.tokenService.getToken() !== null
  }

  logout() {
    this.router.navigate(['/home'])
    this.tokenService.clearToken()
    this.isAuthenticated = false
  }
}
